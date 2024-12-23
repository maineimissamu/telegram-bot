const path = require('path');
const handlePromo = require('../bot/handlePromo');
const handleMonthly = require('../bot/handleMonthly');
const handleAnual = require('../bot/handleAnual');
const { sendVerificationEmail } = require('./sendEmail');
const findUser = require('../utils/userServices/findUserService');

// Registrar acciones globalmente
function registerTarifasActions(bot) {
    bot.action('promo_bienvenida', async (ctx) => {
        const chatId = ctx.chat.id;
        const user = await findUser({ chatId });

        if (user) {
            await handlePromo(ctx);
        } else {
            await ctx.reply('Por favor, verifica tu correo antes de continuar.');
            sendVerificationEmail(bot);
        }
    });

    bot.action('pago_mensual', async (ctx) => {
        const chatId = ctx.chat.id;
        const user = await findUser({ chatId });

        if (user) {
            await handleMonthly(ctx);
        } else {
            await ctx.reply('Por favor, verifica tu correo antes de continuar.');
            sendVerificationEmail(bot);
        }
    });

    bot.action('pago_anual', async (ctx) => {
        const chatId = ctx.chat.id;
        const user = await findUser({ chatId });

        if (user) {
            await handleAnual(ctx);
        } else {
            await ctx.reply('Por favor, verifica tu correo antes de continuar.');
            sendVerificationEmail(bot);
        }
    });
}

// Función principal para manejar tarifas
async function handleTarifas(ctx) {
    const imagePath = path.join(__dirname, '../../assets/tarifas.png');

    await ctx.replyWithPhoto(
        { source: imagePath },
        {
            caption: `💳 Tarifas disponibles:

1️⃣ Promoción de bienvenida: 80€ por 60 días (Pago único, no recurrente).  
2️⃣ Pago mensual: 80€ por 30 días (Pago recurrente).  
3️⃣ Pago anual: 880€ por 365 días (Un mes gratis, pago único, no recurrente).  

Selecciona una opción para continuar:`,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Promoción de bienvenida', callback_data: 'promo_bienvenida' }],
                    [{ text: 'Pago mensual', callback_data: 'pago_mensual' }],
                    [{ text: 'Pago anual', callback_data: 'pago_anual' }]
                ]
            }
        }
    );
}

module.exports = { handleTarifas, registerTarifasActions };
