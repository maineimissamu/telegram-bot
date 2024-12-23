const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false; // Para verificar si ya está conectado

const connectDB = async () => {
    if (isConnected) {
        console.log('Ya existe una conexión activa con la base de datos.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log('Conexión a MongoDB exitosa.');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        throw new Error('No se pudo conectar a la base de datos.');
    }
};

module.exports = connectDB;
