const findUser = require('../utils/userServices/findUserService');
const hasActiveSubscription = require('../utils/userServices/hasActiveSubscriptionService');

/**
 * Maneja los nuevos miembros del grupo.
 * Verifica si tienen una suscripción activa. Si no, los expulsa.
 * @param {Telegraf.Context} ctx - Contexto proporcionado por Telegraf.
 */
const handleNewMembers = async (ctx) => {
    const newMembers = ctx.message.new_chat_members; // Miembros detectados en el mensaje

    for (const member of newMembers) {
        console.log(`Nuevo miembro detectado: ${member.id}, nombre: ${member.first_name}`);

        try {
            // Buscar al usuario en la base de datos por su chatId
            console.log(`Buscando al usuario con chatId ${member.id} en la base de datos...`);
            const user = await findUser({ chatId: member.id });

            if (!user) {
                console.log(`Usuario con chatId ${member.id} no encontrado. Expulsando...`);
                await ctx.telegram.kickChatMember(ctx.chat.id, member.id);
                console.log(`Usuario con ID ${member.id} expulsado del grupo ${ctx.chat.id}.`);
                continue;
            }

            // Verificar si el usuario tiene una suscripción activa
            const email = user.email;
            console.log(`Usuario encontrado: ${email}. Verificando suscripción activa...`);
            const isActive = await hasActiveSubscription(email);

            if (!isActive) {
                console.log(`Usuario con correo ${email} no tiene una suscripción activa. Expulsando...`);
                await ctx.telegram.kickChatMember(ctx.chat.id, member.id);
                console.log(`Usuario con correo ${email} expulsado del grupo ${ctx.chat.id}.`);
            } else {
                console.log(`Usuario con correo ${email} tiene una suscripción activa. Bienvenido al grupo.`);
                await ctx.reply(`¡Bienvenido al grupo, ${member.first_name || 'nuevo miembro'}!`);
            }
        } catch (error) {
            console.error(`Error manejando al nuevo miembro ${member.id}:`, error.message);
        }
    }
};

module.exports = handleNewMembers;
