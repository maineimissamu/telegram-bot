const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    status: {type: String, }, 
    createdAt: {type: Date, },
    expiresAt: {type: Date, },
    type: {type: String, default: null},
})

const userSchema = new mongoose.Schema({
    chatId: {type: String, unique: true},
    email: {type: String, required: true, unique: true},
    subscriptionPlan: subscriptionSchema,
    paymentIntent: {type: String, default: null},
    isSessionCompleted: {type: Boolean, default: false},
    hasPurchasedSubscription: { type: Boolean, default: false },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;