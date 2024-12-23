const User = require('../../database/models/user');

/**
 * Busca un usuario en la base de datos
 * @param {Object} filter - Filtro de busqueda (chatId o email)
 * @returns {Promise<Object|null>} - Devuelve el usuario encontrado o null si no existe
 */

const findUser = async (filter) => {
    try {
        const user = await User.findOne(filter);
        if(!user) {
            console.log("Usuario no encontrado.")
            return null;
        }
        console.log('Usuario encontrado:', user);
        return user;
    } catch (error) {
        console.error('Error al buscar el usuario:', error.message);
        throw new Error('No se pudo buscar el usuario');
    }
}

module.exports = findUser;