const nodemailer = require('nodemailer');
const generadeRandomCode = require('./gerenadeCode');
const createUserService = require('./userServices/createUserService');
const codeStorage = new Map(); // Para almacenar temporalmente los códigos enviados

/**
 * Manejar mensajes, enviar correos de verificación y verificar códigos.
 * @param {Object} bot - Instancia del bot de Telegram.
 */
const sendVerificationEmail = (bot) => {
    // Manejar mensajes de correo y códigos
    bot.on('message', async (msgCtx) => {
        const userMessage = msgCtx.message.text;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const chatId = msgCtx.message.chat.id;
        if (emailRegex.test(userMessage)) {
            // Guardar el correo temporalmente hasta confirmar
            codeStorage.set(userMessage, null);

            // Enviar botones para confirmar o cambiar el correo
            await msgCtx.reply('¿Quieres confirmar este correo?', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Confirmar', callback_data: `confirm_${userMessage}` },
                            { text: 'Cambiar correo', callback_data: 'change_email' }
                        ]
                    ]
                }
            });
        } else if (/^\d{6}$/.test(userMessage)) { // Verificar si el mensaje es un código de 6 dígitos
            let emailToVerify = null;

            // Buscar el correo asociado al código
            for (const [email, code] of codeStorage.entries()) {
                if (code === userMessage) {
                    emailToVerify = email;
                    break;
                }
            }

            if (emailToVerify) {
                codeStorage.delete(emailToVerify); // Remover el código tras validarlo
                await msgCtx.reply(`El código es válido. Correo verificado: ${emailToVerify}`);
                await createUserService(chatId, emailToVerify)
            } else {
                await msgCtx.reply('El código ingresado no es válido o ha expirado.');
            }
        } else {
            await msgCtx.reply(`El correo electrónico "${userMessage}" no es válido o no tiene un código asociado. Por favor, intenta nuevamente.`);
        }
    });

    // Manejar interacciones de botones
    bot.on('callback_query', async (ctx) => {
        const data = ctx.callbackQuery.data;

        if (data.startsWith('confirm_')) {
            const userMessage = data.replace('confirm_', '');
            const verificationCode = generadeRandomCode(); // Generar el código aleatorio

            // Actualizar el código asociado al correo
            codeStorage.set(userMessage, verificationCode);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "kiokomachkio@gmail.com", // Dirección de correo
                    pass: "wgyz jmbi cdrk dges", // Contraseña o app password
                },
                tls: { rejectUnauthorized: false }
            });

            const mailOptions = {
                from: "kiokomachkio@gmail.com",
                to: userMessage,
                subject: 'Código de verificación',
                text: `Tu código de verificación es: ${verificationCode}`
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log(`Correo enviado a ${userMessage} con el código ${verificationCode}`);
                await ctx.reply(`Gracias. El correo electrónico "${userMessage}" es válido. Se ha enviado un código de verificación.`);
            } catch (error) {
                console.error('Error al enviar el correo:', error);
                await ctx.reply('Ocurrió un error al enviar el correo. Por favor, intenta nuevamente más tarde.');
            }
        } else if (data === 'change_email') {
            await ctx.reply('Por favor, ingresa un nuevo correo electrónico.');
        }

    });
};

module.exports = { sendVerificationEmail };
