const User = require("../database/models/user");
const productConfig = require('./productConfig');

/**
 * Maneja el evento `invoice.payment_succeded`
 * @param {Object} invoice - Objeto del evento de factura de Stripe
 */

const handleInvoicePaymentSucceeded = async (invoice) => {
    try {
        const email = invoice.customer_email;
        if(!email) {
            console.warn('No se encontró un correo electronico en el evento de factura.');
            return;
        }

        //Buscar al usuario por correo
        let user = await User.findOne({email});

        if(!user) {
            console.log(`Usuario con correo ${email} no encontrado. Creando uno nuevo.`);
            user = new User({email, chatId: null});
        }

        //Obtener la configuracion del producto mensual
        const monthlyConfig = Object.values(productConfig).find(product => product.type === 'Pago Mensual');

        if(!monthlyConfig) {
            console.warn('No se encontro la configuracion para la suscripcion mensual.')
        }

        user.subscriptionPlan = {
            status: 'active',
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + monthlyConfig.durationDays * 24 * 60 * 60 * 1000),
            type: 'Pago Mensual',
        };
        // Marcar hasPurchasedSubscription como true
        user.hasPurchasedSubscription = true;

        await user.save();
        console.log(`Suscripcion mensual activada para ${email}, expira en ${monthlyConfig.durationDays} dias.`);
    } catch (error) {
        cpnsole.error('Error manejando invoice.payment_succeeded:', error.message)
    }
}

module.exports = handleInvoicePaymentSucceeded