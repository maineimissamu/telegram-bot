const User = require('../../database/models/user');

/**
 * Verifica si un correo tiene una suscripcion activa
 * @param {string} email - Correo del usuario
 * @returns {Promise<boolean>} - `true` si la suscripcion esta activa, `false` en caso contrario
 */

const hasActiveSubscription = async (email) => {
    try {
        // Buscar al usuario por correo
        const user = await User.findOne({email});

        if(!user) {
            console.log(`Usuario con correo ${email} no encontrado`);
            return false;
        }

        if(user.subscriptionPlan && user.subscriptionPlan.status === 'active') {
            console.log(`El usuario con correo ${email} tiene una suscripcion activa.`);
            return true;
        }

        console.log(`El usuario con correo ${email} no tiene una suscripcion activa.`);
        return false;
    } catch (error) {
        console.error('Error verificando la suscripcion activa:', error.message);
        throw new Error('No se pudo verificar la suscripcion activa');
    }
}

module.exports = hasActiveSubscription;