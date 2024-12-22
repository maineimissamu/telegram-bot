const {hasPurchasedProduct} = require('./hasUserPurchasedProduct');

(async () => {
    try {
        const email = 'kiokomac@gmail.com';
        const productId = "prod_RRTzN062zQyJkN";

        const result = await hasPurchasedProduct(email, productId);

        console.log(`¿El correo ${email} compro el producto ${productId}?`, result ? 'Si' : 'No');
    } catch (error) {
        console.error('Error durante la prueba:', error);
    }   
})();