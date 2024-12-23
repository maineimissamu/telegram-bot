const { createPaymentSession } = require('./stripe'); // Importar la funcion creada

(async () => {
    const successUrl= 'http://localhost:3000/success'; // URL de exito
    const cancelUrl = 'http://localhost:3000/cancel';

    try {
        //Prueba con la Promocion de Bienvenida (pago único)
        const promoUrl = await createPaymentSession('price_1QXtifIIU3N2X4VQ7el4i9Xu', 'payment', successUrl, cancelUrl);
        console.log('Sesión de pago creada para la Promocion de Bienvenida', promoUrl);

        const monthlyUrl = await createPaymentSession('price_1QUGE6IIU3N2X4VQ0fq6jRjh', 'subscription', successUrl, cancelUrl);
        console.log('Sesion de pago creada para Pago Mensual:', monthlyUrl);

        const anualUrl = await createPaymentSession('price_1QYrLzIIU3N2X4VQHcjGxny8', 'payment', successUrl, cancelUrl)
        console.log('Sesion de pago creada para Pago Anual:', anualUrl);
    } catch (error) {
        console.error('Error creando la sesion de pago:', error)
    }
})();