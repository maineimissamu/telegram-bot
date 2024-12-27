const path = require('path');
const handlePromo = require('../bot/handlePromo');
const handleMonthly = require('../bot/handleMonthly');
const handleAnual = require('../bot/handleAnual');
const { sendVerificationEmail } = require('./sendEmail');
const findUser = require('../utils/userServices/findUserService');
const hasUserPurchasedProduct = require('../payments/hasUserPurchasedProduct'); // Importación de la función
const handleGroupLink = require('./goupLink'); // Importar la funcionalidad del botón de enlace

// Registrar acciones globalmente
function registerTarifasActions(bot) {
    bot.action('promo_bienvenida', async (ctx) => {
        const chatId = ctx.chat.id;
        const user = await findUser({ chatId });

        if (user) {
            const hasPurchased = await hasUserPurchasedProduct(chatId);
            if (hasPurchased) {
                await ctx.reply('❌ La promoción de bienvenida no está disponible para usuarios que ya han comprado una suscripción.'); // NUEVO: Mensaje explicativo
            } else {
                await handlePromo(ctx);
            }
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

    bot.action('generate_group_link', handleGroupLink); // Conectar el botón al manejador
}

// Función principal para manejar tarifas
async function handleTarifas(ctx) {
    const imagePath = path.join(__dirname, '../../assets/tarifas.png');
    const chatId = ctx.chat.id;

    try {
        const hasPurchased = await hasUserPurchasedProduct(chatId); // Verificación de compra

        const caption = `*💳 Tarifas disponibles:*

**1️⃣ Promoción de bienvenida:** 80€ por 60 días (Pago único, no recurrente).  
**2️⃣ Pago mensual:** 80€ por 30 días (Pago recurrente).  
**3️⃣ Pago anual:** 880€ por 365 días (Un mes gratis, pago único, no recurrente).  

*Selecciona una opción para continuar:*`;

        const inlineKeyboard = [
            [
                {
                    text: hasPurchased ? '❌ Promoción no disponible' : 'Promoción de bienvenida',
                    callback_data: 'promo_bienvenida'
                }
            ],
            [{ text: 'Pago mensual', callback_data: 'pago_mensual' }],
            [{ text: 'Pago anual', callback_data: 'pago_anual' }],
            [{ text: '¿Has pagado ya? Pulsa para generar enlace al grupo', callback_data: 'generate_group_link' }]
        ];

        await ctx.replyWithPhoto(
            { source: imagePath },
            {
                caption,
                parse_mode: 'Markdown',
                reply_markup: { inline_keyboard: inlineKeyboard }
            }
        );
    } catch (error) {
        console.error('Error verificando la compra:', error.message);
        await ctx.reply('⚠️ Ha ocurrido un error al verificar tu suscripción. Por favor, intenta nuevamente más tarde.');
    }
}

module.exports = { handleTarifas, registerTarifasActions };
