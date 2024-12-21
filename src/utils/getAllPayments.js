require('dotenv').config({ path: './src/payments/.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Recupera todos los pagos realizados
 * @returns {Promise<Array>} - Lista de pagos con información detallada
 */

async function getAllPayments() {
    console.log(process.env.STRIPE_SECRET_KEY);
    try {
        // Recuperar todos los Payment Intents desde Stripe
        const paymentIntents = await stripe.paymentIntents.list({
            limit: 1, // Numero maximo de registros
        });

        const payments = await Promise.all(paymentIntents.data.map(async (intent) => {
            //Obtener detalles adicionales del producto desde el Checkout Session
            const session = await stripe.checkout.sessions.list({
                payment_intent: intent.id,
            });
            if(session.data.length > 0) {
                const lineItems = await stripe.checkout.sessions.listLineItems(session.data[0].id, {
                    expand: ['data.price.product'],
                });

                //Devolver detalles relevantes
                return {
                    paymentId: intent.id,
                    amount: intent.amount / 100,
                    currency: intent.currency,
                    status: intent.status,
                    customer: {
                        email: session.data[0].customer_details.email,
                        name: session.data[0].customer_details.name,
                    },
                    products: lineItems.data.map((item) => ({
                        productId: item.price.product.id,
                        productName: item.price.product.name,
                        quantity: item.quantity,
                    })),
                }
            }
            return null;
        }))

        return payments.filter((payment) => payment !== null);
        
    } catch (error) {
        console.error(`Error al recuperar pagos:`, error);
        throw new Error('No se pudieron recuperar los pagos');
    }
}

module.exports = {getAllPayments}