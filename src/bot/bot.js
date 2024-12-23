const { Telegraf } = require('telegraf');
const { rutaImagen, captionTexto } = require('./sendInformation');
const { setupManageButton } = require('../utils/manageButton');

/**
 * Inicia el bot de Telegram
 */
const startBot = () => {
    const bot = new Telegraf("7877086044:AAEAbaQaVF-r1EG719OCRj7XoSXDy0Z5sLw"); // Usa el token desde el archivo .env

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

    setupManageButton(bot);

    // Inicia el bot
    bot.launch();
    console.log('Bot está corriendo...');

    // Maneja la salida del proceso
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

module.exports = startBot;
