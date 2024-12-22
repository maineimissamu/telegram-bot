const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    chatId: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    subscriptionPlan: {type: String, default: null},
    subscriptionExpireDate: {type: Date, default: null},
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;