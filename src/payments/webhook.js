require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const connectDB = require('../database/database');
const  handleCompletedSession  = require('./handleCompletedSessions'); 
const handlePaymentIntentSucceeded = require('./handlePaymentIntentSucceeded');
const handleInvoicePaymentSucceeded = require('./handleInvoicePaymentSucceeded')

connectDB();
const app = express();

// Clave secreta del webhook (La obtendrás al configurar el webhook en Stripe)
const endpointSecret = process.env.WEBHOOK_KEY;
/*
 * Para usar webhooks, hace falta usar ngrok.
 */
app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        //Verificar que el evento proviene de Stripe
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log(event)
    } catch (error) {
        console.error('Error verificando webhook:', error.message);
    }

    // Manejar el evento checkout.session.completed
    if(event.type === 'checkout.session.completed') {
        try {
            await handleCompletedSession(event.data.object); 
        } catch (error) {
            console.error('Error procesando checkout.session.completed:', error);
        }
    } else if (event.type === 'payment_intent.succeeded') {
        try {
            await handlePaymentIntentSucceeded(event.data.object);
        } catch (error) {
            console.error('Error procesando paymentIntent')
        }
        
    }  else if(event.type === "invoice.payment_succeeded") {
        await handleInvoicePaymentSucceeded(event.data.object);
    }
    else {
        console.log(`Evento no manejado_ ${event}`);
    }
})

//Iniciar el servidor en el puerto 3000
app.listen(4000, () => console.log('Webhooks escuchando en http://localhost:4000/webhook'));