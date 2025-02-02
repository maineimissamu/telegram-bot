const initializeContext = require('./src/context');
require('./src/payments/webhook'); // Webhook
const startBot = require('./src/bot/bot'); // Bot de Telegram

(async () => {
    try {
        // Inicializar el contexto global
        await initializeContext();

        // Revisar si se está ejecutando en modo de prueba
        if (process.argv.includes('--test')) {
            const runTest = require('./src/utils/userServices/testHasActiveSubscriptionService'); // Importar el archivo de prueba
            await runTest(); // Ejecutar la prueba
            process.exit(); // Finalizar el proceso después de la prueba
        }

        // Iniciar el bot
        startBot();

 

        console.log('Aplicación iniciada con éxito.');
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error.message);
        process.exit(1); // Salir si hay un error crítico
    }
})();
