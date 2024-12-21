const handleDudas = require("./dudas");
const handleTarifas = require("./tarifas");

// Función que manejará el botón principal
async function manageButton(ctx) {
    await ctx.reply(
        `✅ Dentro del canal tienes:

- ‼️Cómo empezar a operar para gente no iniciada + Elección de brokers.
- 🗣️Explicación sencilla del funcionamiento de las estrategias. Para todos los niveles.
- 📍Consejos sobre gestión del riesgo según el capital de cada cual.
- 🔎Tips de psicología bursátil y funcionamiento de mercado.

✅ Una forma sencilla de aprender a operar con seguridad y riesgo controlado de la mano de inversores experimentados que ya han recorrido el camino.

⬇️ ¡Pruébalo! No pierdes nada.

🔖 Accede a un grupo de calidad con trabajo profesional y dedicación completa.

Escríbeme para aclarar tus dudas. @IC_Bolsa`,
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Tarifas', callback_data: 'tarifas_click' }],
                    [{ text: 'Dudas', callback_data: 'dudas_click' }]
                ]
            }
        }
    );
}

// Función para registrar las acciones de los botones
function registerButtonActions(bot) {
    bot.action('tarifas_click', handleTarifas);
    bot.action('dudas_click', handleDudas);
}

module.exports = { manageButton, registerButtonActions };
