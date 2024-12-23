const User = require('../database/models/user');
const productConfig = require('./productConfig');

/**
 * Maneja el evento `payment_intent.succeeded` con lógica de espera
 * @param {Object} paymentIntent - Objeto del Payment Intent
 */
const handlePaymentIntentSucceeded = async (paymentIntent) => {
    try {
        const MAX_RETRIES = 10; // Máximo número de reintentos
        const RETRY_DELAY = 1000; // Retraso entre reintentos en milisegundos

        let user = null;
        let retries = 0;

        // Intentar buscar al usuario asociado al paymentIntent con reintentos
        while (!user && retries < MAX_RETRIES) {
            user = await User.findOne({ paymentIntent: paymentIntent.id });
            if (!user) {
                console.log(`Intento ${retries + 1}: Usuario con paymentIntent ${paymentIntent.id} no encontrado. Reintentando...`);
                retries++;
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Esperar antes del próximo intento
            }
        }

        if (!user) {
            console.error(`Usuario con paymentIntent ${paymentIntent.id} no encontrado después de ${MAX_RETRIES} intentos.`);
            return;
        }

        // Verificar si checkout.session.completed ya fue procesado
        if (!user.isSessionCompleted) {
            console.log(`Checkout.session.completed aún no ha sido procesado para ${user.email}.`);
            return;
        }

        // Determinar el producto comprado y su configuración
        const purchasedProduct = user.subscriptionPlan.type;
        const config = Object.values(productConfig).find(product => product.type === purchasedProduct);

        if (!config) {
            console.warn(`El producto '${purchasedProduct}' no tiene configuración.`);
            return;
        }

        // Completar los campos de `subscriptionPlan`
        user.subscriptionPlan = {
            ...user.subscriptionPlan,
            status: 'active',
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + config.durationDays * 24 * 60 * 60 * 1000),
        };

        // Limpiar el campo `paymentIntent`
        user.paymentIntent = null;

        // Marcar hasPurchasedSubscription como true
        user.hasPurchasedSubscription = true;

        // Guardar los cambios en la base de datos
        await user.save();

        console.log(`Suscripción completada para ${user.email}: ${purchasedProduct}, expira en ${config.durationDays} días.`);
    } catch (error) {
        console.error('Error manejando payment_intent.succeeded:', error.message);
    }
};

module.exports = handlePaymentIntentSucceeded;
