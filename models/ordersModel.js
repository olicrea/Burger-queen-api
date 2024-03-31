const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    userId: {
        type: Number
    },
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
        enum: ['pending', 'ready', 'delivered', 'canceled']
    },
    dateEntry: {
        type: Date
    },
    dateProcessed: {
        type: Date
    },
    error: {
        type: String
    }

});

module.exports = mongoose.model("order", orderSchema);

//GET - ORDERS - LIST ORDERS
