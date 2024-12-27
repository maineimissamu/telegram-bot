const findUsersByExpiry = require('./findUsersByExpiry');
const updateUserStatus = require('./updateUserStatus');

/**
 *  Maneja la expulsion de usuarios con suscripciones expiradas
 */

const handleExpiredSubscriptions = async (bot) => {
    try {
        const expiredUsers = await findUsersByExpiry();

        for(const user of expiredUsers) {
            console.log(`Expulsando al usuario ${user.chatId} del grupo`);

            // Intentar expulsar al usuario del grupo
            try {
                await bot.telegram.kickChatMember(process.env.GROUP_ID, user.chatId);
                console.log(`Usuario ${user.chatId} expulsado del grupo ${process.env.GROUP_ID}`);
            } catch (error) {
                console.error(`Error al expulsar al usuario ${user.chatId}:`, error.message);
            }

            // Actualizar el estado del usuario en la base de datos
            try {
                await updateUserStatus(user.chatId, 'inactive');
                console.log(`Estado del usuario ${user.chatId} actualizado a 'inactive'.`);
            } catch (error) {
                console.error(`Error actualizando el estado del usuario ${user.chatId}:`, error.message);
            }
        }
    } catch (error) {

    }
}

module.exports = handleExpiredSubscriptions;