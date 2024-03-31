const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    // qty: {
    //     type: Number
    // },
    id: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: String
    },
    image: {
        type: String
    },
    type: {
        type: String
    },
    dateEntry: {
        type: Date 
    },
    error: {
        type: String
    }
  });
  

module.exports = mongoose.model("product", productsSchema);
