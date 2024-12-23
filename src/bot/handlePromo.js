const { createPaymentSession } = require('../payments/stripe');

async function handlePromo(ctx) {
    try {
        const paymentLink = await createPaymentSession(
            'price_1QXtifIIU3N2X4VQ7el4i9Xu', // ID del precio
            'payment', // Modo de pago único
            'http://localhost:3000/success', // URL de éxito
            'http://localhost:3000/cancel'   // URL de cancelación
        );

        await ctx.reply(
            `Aquí está tu enlace de pago: [Haz clic aquí para pagar](${paymentLink})`,
            { parse_mode: 'Markdown' }
        );
    } catch (error) {
        console.error('Error al generar el enlace de pago:', error.message);
        await ctx.reply(
            'Ocurrió un error al generar el enlace de pago. Por favor, inténtalo nuevamente más tarde.'
        );
    }
}

module.exports = handlePromo;
