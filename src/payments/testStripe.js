const { createPaymentSession } = require('./stripe'); // Importar la funcion creada

(async () => {
    const successUrl= 'http://localhost:3000/success'; // URL de exito
    const cancelUrl = 'http://localhost:3000/cancel';

    try {
        //Prueba con la Promocion de Bienvenida (pago único)
        const promoUrl = await createPaymentSession('price_1QYb1m4gaL6VjssxwqiFDLUS', 'payment', successUrl, cancelUrl);
        console.log('Sesión de pago creada para la Promocion de Bienvenida', promoUrl);

        const monthlyUrl = await createPaymentSession('price_1QYb0P4gaL6VjssxIuejBG77', 'subscription', successUrl, cancelUrl);
        console.log('Sesion de pago creada para Pago Mensual:', monthlyUrl);
    } catch (error) {
        console.error('Error creando la sesion de pago:', error)
    }
})();