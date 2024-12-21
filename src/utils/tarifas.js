const path = require('path');

// Función que manejará el botón "Tarifas"
async function handleTarifas(ctx) {
    // Corregir el uso de path.join y especificar la extensión correcta
    const imagePath = path.join(__dirname, '../../assets/tarifas.png'); 

    await ctx.replyWithPhoto(
        { source: imagePath }, // Enviar la imagen
        {
            caption: `💳 *Tarifas disponibles:*

1️⃣ *Promoción de bienvenida*: 80€ por 60 días \\(Pago único, no recurrente\\)\\.  
2️⃣ *Pago mensual*: 80€ por 30 días \\(Pago recurrente\\)\\.  
3️⃣ *Pago anual*: 880€ por 365 días \\(Un mes gratis, pago único, no recurrente\\)\\.  

Selecciona una opción para continuar:`,
            parse_mode: 'MarkdownV2' // Usar MarkdownV2 para dar formato al texto
        }
    );
}

module.exports = handleTarifas;

