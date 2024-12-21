const { Telegraf } = require('telegraf');
const { rutaImagen, captionTexto } = require('./sendInformation');
const { manageButton, registerButtonActions } = require('../utils/manageButton');


// Reemplaza 'TU_TOKEN_AQUI' con el token de tu bot
const bot = new Telegraf('7993617442:AAHpI37JNXZurkzjz6KVCfb3iijuyEnNEg8');

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

// Acción del botón "Más información"
bot.action('info_click', manageButton);

// Registrar las acciones de los botones adicionales
registerButtonActions(bot);

// Inicia el bot
bot.launch();

console.log('Bot está corriendo...');

// Maneja la salida del proceso
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

