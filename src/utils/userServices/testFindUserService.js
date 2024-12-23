const findUser = require('./findUserService');
const connectDB = require('../../database/database');

const testFindUser = async () => {
    try {
        //Conectar a la base de datos
        await connectDB();
        //Define el filtro para buscar al usuario
        const chatId = '123456789';
        
        const user = await findUser({chatId});

        if(user) {
            console.log('Resultado de la busqueda:', user);
        } else {
            console.log('Usuario no encontrado.');
        }
        
    } catch (error) {
        console.error('Error drante la prueba de busqueda');
    } finally {
        process.exit();
    }
}

testFindUser()