const User = require('../../database/models/user');

/**
 *  Actualiza el estado de un usuario en la base de datos.
 * @param {string} chatId - ID del chat del usuario.
 * @param {string} status - Nuevo estado(e.g, 'inactive').
 */

const updateUserStatus = async (chatId, status) => {
    try {
        await User.updateOne({chatId}, {'subscriptionPlan.status' : status});
        console.log(`Estado del usuario ${chatId} actualizado a ${status}`);
    } catch (error) {
        console.error(`Error actualizando el estado del usuario ${chatId}:`, error.message);
        throw new Error('No se pudo actualizar el estado del usuario');
    }
};

module.exports = updateUserStatus;