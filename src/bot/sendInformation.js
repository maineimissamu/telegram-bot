const path = require('path');
const { Markup } = require('telegraf');

// Ruta de la imagen
const rutaImagen = path.resolve(__dirname, '../../assets/1.png');

// Texto del mensaje
const captionTexto = `*GRUPO PREMIUM 🥇*

📌 **El grupo PREMIUM** es un canal privado donde compartimos nuestra propia operativa en tiempo real.

📉 *Estrategias:*  
- Media de **25/30 estrategias mensuales** en valores.  
- Desde *intradiario y swing trading* hasta *largo plazo*.  
- Cada perfil de inversor tiene operativas adaptadas a sus gustos.

📍 **Análisis técnico y fundamental profesional**  
- Con **24 años de experiencia** operando en los mercados.

🔹 *Marcamos:*  
  - Explicación técnica.  
  - Precio de entrada.  
  - Porcentaje de capital a exponer.  
  - Objetivo.  
  - Stop loss ajustado, con estricta gestión del riesgo.

🗣️ *Seguimiento diario y chat abierto* entre suscriptores.  
🔖 *Resolución de dudas* y análisis de valores en cartera o radar.

🥇 *Track record del canal PREMIUM:*  
- *Año 1*: **+116%** sobre una cuenta inicial de 100,000$.`;

module.exports = { rutaImagen, captionTexto };
