const hasActiveSubscription = require('./hasActiveSubscriptionService');

/**
 * Prueba para verificar si un usuario tiene una suscripción activa
 */
const runTest = async () => {
    try {
        const email = "sam.chadwick.p@gmail.com"; // Cambiar por un correo válido en tu base de datos
        const isActive = await hasActiveSubscription(email);

        console.log(`¿El usuario con correo ${email} tiene una suscripción activa? ${isActive ? "Sí" : "No"}`);
    } catch (error) {
        console.error('Error durante la prueba:', error.message);
    }
};

module.exports = runTest;
