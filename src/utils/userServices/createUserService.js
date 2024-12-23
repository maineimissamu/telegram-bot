const User = require('../../database/models/user');

/**
 * Crea un usuario en la base de datos
 * @param {string} chatId - ID del chat del usuario
 * @param {string} email - Correo electronico del usuario
 * @return {Promise<Object>} - Usuario creado
 */

const createUser = async (chatId, email) => {
    try {
        const newUser = await User.create({chatId, email});
        console.log('Usuario creado;', newUser);
        return newUser;
    } catch (error) {
        console.error('Error al crear el usuario:', error.message);
        throw new Error('No se pudo crear el usuario');
    }
}

module.exports = createUser;