const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    client: {
        type: String, //usersSchema
        required: true
    },
    products: {
        type: [productOrderSchema],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'ready', 'delivered']
    },
    dateEntry: {
        type: Date
    },
    dateProcessed: {
        type: Date
    },

});

module.exports = mongoose.model("order", orderSchema);
