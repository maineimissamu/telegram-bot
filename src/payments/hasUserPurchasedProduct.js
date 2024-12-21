require('dotenv').config();
const {getAllPayments} = require('../utils/getAllPayments');

/**
 * Verifica si un correo ha comprado un producto especifico
 * @param {string} email - Correo del cliente
 * @param {string} productId - ID del producto a verificar
 * @returns {Promise<boolean>} -Verdadero si el correo compró el producto
 */

async function hasPurchasedProduct(email, productId) {
    try {
        const payments = await getAllPayments();
        console.log('Pagos recuperados:', JSON.stringify(payments, null, 2));

        payments.forEach((payment, index) => {
            console.log(`Pago #${index + 1}:`, payment)
            console.log(`Cliente:`, payment.customer);
            console.log('Productos:', payment.products);
        })

        // Buscar si el correo compró el producto
        return payments.some((payment) => 
            payment.customer.email === email && 
            payment.products.some((product) => product.productId === productId)
        );
    } catch (error) {
        console.error('Error al verificar el producto:', error);
        throw new Error('No se pudo verificar la compra del producto');
    }
}

module.exports = {hasPurchasedProduct}