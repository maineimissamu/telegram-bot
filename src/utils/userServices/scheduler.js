const cron = require('node-cron');
const handleExpiredSubscriptions = require('./handleExpiredSubscriptions');

/**
 * Configura tareas programadas
 * @param {Telegraf} bot - Instancia del bot de Telegram.
 */

const startScheduler = (bot) => {
    //Ejecutar la tarea todos los dias a la medianoche
    cron.schedule('*/1 * * * *', async () => {
        console.log('Ejecutando tarea programada para manejar suscripciones expiradas.');
        await handleExpiredSubscriptions(bot);
    });

    console.log('Scheduler inicializado. Tareas programadas configuradas.');
};

module.exports = startScheduler;