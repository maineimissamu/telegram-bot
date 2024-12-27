const User = require('../../database/models/user')

/**
 * Encuentra usuarios cuya suscripcion ha expirado.
 * @returns {Promise<Array>} - Lista de usuarios con suscripcion expirada.
 */

const findUsersByExpiry = async () => {
    const now = new Date();
    try {
        const users = await User.find({
            subscriptionPlan: {$ne: null},
            'subscriptionPlan.expiresAt': {$lte: now},
            'subscriptionPlan.status': 'active'
        }) 
        return users;
     } catch(error) {
        console.error('Error buscando usuarios con suscripciones expiradas:', error.message);
        throw new Error('No se pudieron recuperar usuarios expirados');
     }
};

module.exports = findUsersByExpiry;