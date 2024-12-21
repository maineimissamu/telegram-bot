const { Telegraf } = require('telegraf');
const { rutaImagen, captionTexto} = require('./sendInformation');
const manageButton = require('./utils/manageButton');

// Reemplaza 'TU_TOKEN_AQUI' con el token de tu bot
const bot = new Telegraf('7993617442:AAHpI37JNXZurkzjz6KVCfb3iijuyEnNEg8');

// Responde al comando /start
bot.start(async (ctx) => {
    // Enviar una imagen con texto
    await ctx.replyWithPhoto(
        { source: rutaImagen }, // Ruta de la imagen
        {
            caption: captionTexto,
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Más información', callback_data: 'info_click'}]
                ]
            }
        }
    );
});

//manejar la función del boton usando la función importada
bot.action('info_click', async (ctx) => {
    manageButton(ctx)
});

// Inicia el bot
bot.launch();

console.log('Bot está corriendo...');

// Maneja la salida del proceso
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
