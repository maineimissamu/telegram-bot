const connectDB = require('./database/database'); // Tu archivo de conexión a la base de datos

// Inicializar y compartir dependencias globales
const initializeContext = async () => {
    try {
        // Conexión a la base de datos
        await connectDB();
        console.log('Contexto inicializado con éxito.');
    } catch (error) {
        console.error('Error al inicializar el contexto global:', error.message);
        process.exit(1); // Salir si algo falla al inicializar
    }
};

module.exports = initializeContext;
