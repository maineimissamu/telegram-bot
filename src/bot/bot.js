const { Telegraf } = require('telegraf');

// Reemplaza 'TU_TOKEN_AQUI CON EL TOKEN DE TU BOT
const bot = new Telegraf('7993617442:AAHpI37JNXZurkzjz6KVCfb3iijuyEnNEg8');

// Responde al comando /start
bot.start((ctx) => {
    ctx.reply('¡Hola! soy tu bot de Telegram 🤖. ¿En que puedo ayudarte?');
});

// Inicia el bot
bot.launch();

console.log('Bot está corriendo...');

// Maneja la salida del proceso
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

