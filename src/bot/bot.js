const { Telegraf } = require('telegraf');
const { rutaImagen, captionTexto } = require('./sendInformation');
const { setupManageButton } = require('../utils/manageButton');
const { handleTarifas, registerTarifasActions } = require('../utils/tarifas');
const handleNewMembers = require('./manageNewMembers');
const startScheduler = require('../utils/userServices/scheduler'); // Importar el scheduler

/**
 * Inicia el bot de Telegram
 */
const startBot = () => {
    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN); // Usa el token desde el archivo .env

    // Comando /start
    bot.start(async (ctx) => {
        await ctx.replyWithPhoto(
            { source: rutaImagen }, // Imagen inicial
            {
                caption: captionTexto, // Texto inicial
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Más información', callback_data: 'info_click' }]
                    ]
                }
            }
        );
    });

    // Registrar acciones globalmente
    registerTarifasActions(bot);

    // Manejar nuevos miembros
    bot.on('new_chat_members', async (ctx) => {
        console.log('Nuevos miembros detectados:', JSON.stringify(ctx.message.new_chat_members, null, 2));
        await handleNewMembers(ctx); // Llama a la lógica específica para nuevos miembros
    });

    // Comando para mostrar tarifas
    bot.command('tarifas', handleTarifas);

    setupManageButton(bot);

    // Inicia el bot
    bot.launch();
    console.log('Bot está corriendo...');

    // Iniciar el scheduler para tareas programadas
    startScheduler(bot);

    // Maneja la salida del proceso
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

module.exports = startBot;
