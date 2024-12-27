const findUser = require('./findUserService');
const hasActiveSubscription = require ('./hasActiveSubscriptionService');

/**
 * Maneja la inviacion al grupo de Telegram verificando la suscripcion activa
 * @param {string} chatId - ID del chat del usuario
 * @param {string} groupLink - Enlace del grupo de Telegram
 * @returns {Promise<string>} - Devuelve el enlace 
 */ 

const handleGroupInvitation = async (chatId, groupLink) => {
    try {
        // Buscar al usuario en la base de datos usando el chatId
        const user = await findUser({chatId});

        if(!user) {
            console.log(`No se encontró un usuario con chatId ${chatId}`);
            return 'Usuario no encontrado. Asegurate de estar registrado.';
        }

        const email = user.email;

        // Verificar si tiene una suscripcion activa
        const isActive = await hasActiveSubscription(email);

        if(!isActive) {
            console.log(`El usuario con correo ${email} no tiene una suscripcion activa.`);
            return 'No tienes una suscripcion activa. Por favor, renueva tu plan para obtener acceso al grupo';
        }

        // Si la suscripcion esta activa, devuelve el enlace del grupo
        console.log(`El usuario con correo ${email} tiene una suscripcion activa. Generando enlace...`);
        return `Tu enlace para unirte al grupo es: ${groupLink}`;
    } catch(error) {
        console.error('Error con la invitacion al grupo:', error.message);
        return 'Ocurrio un error procesando tu solicitud. Intentalo mas tarde.'
    }
}

module.exports = handleGroupInvitation;