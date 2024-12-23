# Documentación: Proyecto Telegram Bot

Este documento explica las funcionalidades principales, cómo están conectadas y cómo trabajan juntas.

---

## **1. Conexión a MongoDB**

### **Archivo: `database.js`**
Este archivo establece y mantiene la conexión con MongoDB usando Mongoose.

**Resumen:**
- La conexión se abre al inicio del proyecto y se mantiene activa.
- Cualquier operación que use Mongoose reutiliza esta conexión.

**Código clave:**
```javascript
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1); // Salir si la conexión falla
    }
};

connectDB(); // Abre la conexión al cargar este archivo

module.exports = connectDB;
```

---

## **2. Manejo de Usuarios**

### **Modelo: `user.js`**
Define el esquema de datos para los usuarios en MongoDB.

**Campos principales:**
- `chatId` (String, único): ID del chat del usuario en Telegram.
- `email` (String, único): Correo electrónico del usuario.
- `subscriptionPlan` (String, opcional): Plan de suscripción activo.
- `subscriptionExpireDate` (Date, opcional): Fecha de expiración de la suscripción.

**Código clave:**
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    chatId: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    subscriptionPlan: {type: String, default: null},
    subscriptionExpireDate: {type: Date, default: null},
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
```

---

### **Servicios**
Los servicios se encargan de realizar operaciones CRUD sobre los usuarios. Aquí tienes los servicios existentes:

#### **`createUserService.js`**
**Descripción:** Crea un usuario nuevo en la base de datos.

**Código clave:**
```javascript
const User = require('../../database/models/user');

const createUser = async (chatId, email) => {
    try {
        const newUser = await User.create({chatId, email});
        console.log('Usuario creado:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error al crear el usuario:', error.message);
        throw new Error('No se pudo crear el usuario');
    }
};

module.exports = createUser;
```

#### **`findUserService.js`**
**Descripción:** Busca un usuario en la base de datos.

**Código clave:**
```javascript
const User = require('../../database/models/user');

const findUser = async (filter) => {
    try {
        const user = await User.findOne(filter);
        if (!user) {
            console.log('Usuario no encontrado');
            return null;
        }
        console.log('Usuario encontrado:', user);
        return user;
    } catch (error) {
        console.error('Error al buscar el usuario:', error.message);
        throw new Error('No se pudo buscar el usuario');
    }
};

module.exports = findUser;
```

---

## **3. Integración con Stripe**

### **Archivo: `stripe.js`**
**Descripción:** Este archivo se encarga de manejar la creación de sesiones de pago en Stripe.

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

### **Archivo: `webhook.js`**
**Descripción:** Este archivo escucha los eventos generados por Stripe y redirige la lógica según el tipo de evento.

### **Configuración**
1. **Puerto:** El servidor está configurado para escuchar en el puerto `4000`.
2. **Webhook Key:** Necesitas configurar `WEBHOOK_KEY` en tu archivo `.env` con la clave del webhook de Stripe.

---

### **Archivo: `handleCompletedSessions.js`**
**Descripción:** Este archivo maneja la lógica del evento `checkout.session.completed`. Expande los `line_items` de la sesión para extraer los detalles del producto comprado.

**Funciones**
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

### **Archivo: `testStripe.js`**
**Descripción:** Este archivo es utilizado para probar la funcionalidad de `createPaymentSession`.

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
```

---

### **4. Próximos pasos**
1. **Conectar los servicios al bot:** Integrar las funciones CRUD y Stripe con los comandos del bot.
2. **Probar el flujo completo:** Asegurarse de que los pagos, la creación de usuarios y las consultas funcionen correctamente.
3. **Optimizar la estructura:** Consolidar los servicios y organizar los comandos del bot para facilitar la escalabilidad.
