require('dotenv').config(); // Cargar variables de entorno
const stripe = require('stripe'); // Importar Stripe

// Inicializar Stripe con la clave secreta
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Crea una sesión de pago en Stripe
 * @param {string} priceId - ID del precio del producto (Promoción, Anual, Mensual)
 * @param {string} mode - Modo de pago: 'payment' para pagos únicos o 'subscription' para pagos recurrentes
 * @param {string} successUrl - URL de éxito
 * @param {string} cancelUrl - URL de cancelación
 * @returns {Promise<string>} - URL de la sesión de pago
 */


async function createPaymentSession(priceId, mode, successUrl, cancelUrl) {
    try {
        const session = await stripeClient.checkout.sessions.create({
            payment_method_types: ['card'], // Solo pagos con tarjeta
            mode: mode, // 'payment' para único, 'subscription' para recurrente
            line_items: [
                {
                    price: priceId, // Usar directamente el ID del precio de Stripe
                    quantity: 1, // Cantidad fija en 1
                },
            ],
            success_url: successUrl, // URL a redirigir si el pago es exitoso
            cancel_url: cancelUrl, // URL a redirigir si se cancela el pago
        });

        return session.url; // Devuelve la URL de la sesión de pago
    } catch (error) {
        console.error('Error creando la sesión de pago:', error);
        throw new Error('No se pudo crear la sesión de pago');
    }
}

module.exports = {
    createPaymentSession,
};
