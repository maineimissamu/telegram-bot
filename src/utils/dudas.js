const path = require('path');

// Función que manejará el botón "Dudas"
async function handleDudas(ctx) {
    const imagePath = path.join(__dirname, '../../assets/dudas.png');
    await ctx.replyWithPhoto(
        { source: imagePath },
        {
            caption: `❓ *Dudas:*

*¿Cuál es el capital mínimo para empezar?*  
No hay capital mínimo\\.  
Cada cual puede operar con el capital que quiera ya que todas las estrategias se marcan por porcentaje de cartera\\. Incluso hay suscriptores que operan con cuentas demo \\(dinero ficticio\\) para ir aprendiendo\\.  

*¿Puedo hacer las operaciones si no tengo experiencia y soy nuevo en el mundo de las inversiones?*  
Por supuesto\\.  
Las operaciones están explicadas de forma clara y sencilla para que sean entendibles por los principiantes\\.  

*¿Tengo algún tipo de compromiso?*  
Ninguno\\.  
Puedes darte de baja del servicio en cualquier momento con solo enviar un mensaje al administrador\\.`,
            parse_mode: 'MarkdownV2'
        }
    );
}

module.exports = handleDudas;
