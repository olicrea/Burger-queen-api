const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
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
    }
  });
  

module.exports = mongoose.model("products", productsSchema);
