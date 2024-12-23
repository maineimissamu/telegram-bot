const connectDB = require('../database/database');
const hasUserPurchasedProduct = require('./hasUserPurchasedProduct');

(async () => {
    try {
        await connectDB();

        const email = 'sam.chadwick.p@gmail.com'; // Cambiar por un correo válido
        const hasPurchased = await hasUserPurchasedProduct(email);

        console.log(`¿El usuario con correo ${email} ha comprado alguna suscripción? ${hasPurchased ? 'Sí' : 'No'}`);
    } catch (error) {
        console.error('Error durante la prueba:', error.message);
    } finally {
        process.exit();
    }
})();
