const User = require('../database/models/user');

/**
 * Verifica si un usuario ha comprado alguna vez una suscripción
 * @param {string} email - Correo electrónico del usuario
 * @returns {Promise<boolean>} - Retorna `true` si el usuario ha comprado una suscripción, de lo contrario `false`
 */
const hasUserPurchasedProduct = async (email) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`Usuario con correo ${email} no encontrado.`);
            return false;
        }

        return user.hasPurchasedSubscription || false;
    } catch (error) {
        console.error('Error verificando si el usuario ha comprado una suscripción:', error.message);
        throw new Error('No se pudo verificar la compra.');
    }
};

module.exports = hasUserPurchasedProduct;
