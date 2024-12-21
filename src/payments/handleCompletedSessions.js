const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Maneja el evento `checkout.session.completed`
 * @param {object} session - Objeto de la sesion de pago completada
 */

async function handleCompletedSession(session) {
    try {
        // Expandir los line_items para obtener detalles del producto
        const sessionWithItems = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['line_items.data.price.product'],
        });

        const lineItems = sessionWithItems.line_items.data;

        // Procesar cada producto comprado
        lineItems.forEach(item =>  {
            const productId = item.price.product; // ID del producto
            const productName = item.price.product.name; // Nombre del producto
            const quantity = item.quantity; // Cantidad comprada

            console.log(`Producto comprado: ${productName} (ID: ${productId}), Cantidad: ${quantity}`);
        });
        console.log('Evento procesado correctamente');
    } catch (error) {
        console.error('Error procesando checkout.session.completed', error);
        throw error;
    }
}

module.exports = {handleCompletedSession};