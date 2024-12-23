const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../database/models/user');
const productConfig = require('./productConfig'); // Configuración de productos

/**
 * Maneja una sesión de pago completada
 * @param {Object} session - Objeto de la sesión de Stripe
 */
const handleCompletedSession = async (session) => {
    try {
        const email = session.customer_details.email;

        // Buscar o crear un usuario
        let user = await User.findOne({ email });
        if (!user) {
            console.log(`Usuario con correo ${email} no encontrado, creando uno nuevo.`);
            user = new User({ email, chatId: null }); // chatId será null hasta que lo asignes
        }

        // Guardar el paymentIntent
        user.paymentIntent = session.payment_intent; // Asociar el paymentIntent al usuario

        // Obtener los productos comprados
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
            expand: ['data.price.product'],
        });

        for (const item of lineItems.data) {
            const productId = item.price.product.id;

            if (productConfig[productId]) {
                const { type } = productConfig[productId];

                if (type) {
                    // Actualizar solo el campo `type` en `subscriptionPlan`
                    user.subscriptionPlan = {
                        ...user.subscriptionPlan,
                        type, // Sobrescribir el campo `type`
                    };
                    console.log(`Suscripción '${type}' asignada a ${email}`);
                } else {
                    console.warn(`El producto con ID ${productId} no tiene un tipo definido.`);
                }
            } else {
                console.warn(`Producto con ID ${productId} no tiene reglas especiales configuradas.`);
            }
        }

        // Marcar `checkout.session.completed` como procesado
        user.isSessionCompleted = true;

        // Guardar cambios en la base de datos
        await user.save();
        console.log(`Datos preliminares guardados para ${email}`);
    } catch (error) {
        console.error('Error manejando la sesión completada:', error.message);
    }
};

module.exports = handleCompletedSession;
