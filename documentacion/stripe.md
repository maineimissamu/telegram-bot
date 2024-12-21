# Documentación: Stripe Integration

Este documento detalla la implementación de las funcionalidades relacionadas con Stripe en el proyecto.

---

## **1. Archivo: `stripe.js`**
### **Descripción**
Este archivo se encarga de manejar la creación de sesiones de pago en Stripe. Soporta dos tipos de sesiones:
- **Pagos únicos:** Para productos como "Promoción de Bienvenida" o "Pago Anual".
- **Suscripciones recurrentes:** Como "Suscripción Mensual".

### **Funciones**
#### `createPaymentSession(priceId, mode, successUrl, cancelUrl)`
- **Descripción:** Crea una sesión de pago en Stripe.
- **Parámetros:**
  - `priceId`: ID del precio del producto configurado en Stripe.
  - `mode`: Modo de pago (`payment` para pagos únicos, `subscription` para pagos recurrentes).
  - `successUrl`: URL a redirigir si el pago es exitoso.
  - `cancelUrl`: URL a redirigir si el pago es cancelado.
- **Retorna:** URL de la sesión de pago.

---

## **2. Archivo: `webhook.js`**
### **Descripción**
Este archivo escucha los eventos generados por Stripe y redirige la lógica según el tipo de evento. Actualmente maneja:
- **`checkout.session.completed`:** Procesa los pagos exitosos.

### **Configuración**
1. **Puerto:** El servidor está configurado para escuchar en el puerto `4000`.
2. **Webhook Key:** Necesitas configurar `WEBHOOK_KEY` en tu archivo `.env` con la clave del webhook de Stripe.

---

## **3. Archivo: `handleCompletedSessions.js`**
### **Descripción**
Este archivo maneja la lógica del evento `checkout.session.completed`. Expande los `line_items` de la sesión para extraer los detalles del producto comprado.

### **Funciones**
#### `handleCompletedSession(session)`
- **Descripción:** Procesa los productos comprados en una sesión de pago.
- **Parámetros:**
  - `session`: Objeto de la sesión de pago completada.
- **Lógica:**
  1. Expande los `line_items` para obtener detalles como:
     - Nombre del producto.
     - ID del producto.
     - Cantidad comprada.
  2. Imprime los detalles en la consola.
- **Posibilidades de expansión:**
  - Guardar los datos en una base de datos.
  - Notificar al usuario en Telegram sobre el pago exitoso.

---

## **4. Archivo: `testStripe.js`**
### **Descripción**
Este archivo es utilizado para probar la funcionalidad de `createPaymentSession`.

### **Pruebas configuradas**
1. **Promoción de Bienvenida:**
   - Precio único.
   - ID de precio: `'price_1QXtifIIU3N2X4VQ7el4i9Xu'`.
2. **Pago Mensual:**
   - Suscripción recurrente.
   - ID de precio: `'price_1QUGE6IIU3N2X4VQ0fq6jRjh'`.

### **Ejecución**
Ejecutar el archivo con el comando:
```bash
node src/payments/testStripe.js
