require('dotenv').config();
const createUser = require('./createUserService');
const connectDB = require('../../database/database');

(async () => {
    try {
        await connectDB();

        const chatId = '123456789';
        const email = 'testuser@gmail.com';

        const newUser = await createUser(chatId, email);
        console.log('Usuario creado con éxito:', newUser);
    } catch(error) {
        console.error('Error:', error.message);
    } finally {
        process.exit();
    }
})();