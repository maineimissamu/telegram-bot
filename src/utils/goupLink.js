const path = require('path');

/**
 * Maneja el botón "¿Has pagado ya? Pulsa para generar enlace al grupo".
 * @param {Object} ctx - Contexto de Telegram proporcionado por Telegraf.
 */
async function handleGroupLink(ctx) {
    const imagePath = path.join(__dirname, '../../assets/bienvenida.png');

    const caption = `*🔗 Generar enlace al grupo:*

Has completado el pago con éxito. Ahora puedes unirte al grupo premium para acceder a todos los beneficios.

[Pulsa aquí para unirte al grupo](https://t.me/tu_grupo_enlace)`;

    try {
        await ctx.replyWithPhoto(
            { source: imagePath },
            {
                caption,
                parse_mode: 'Markdown',
            }
        );
    } catch (error) {
        console.error('Error al generar enlace al grupo:', error.message);
        await ctx.reply('⚠️ Ocurrió un error al intentar generar el enlace al grupo. Por favor, inténtalo más tarde.');
    }
}

module.exports = handleGroupLink;
