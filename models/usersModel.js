const { default: mongoose } = require("mongoose");

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'waiter', 'chef'],
        required: true
    }
    // O: Mongodb automáticamente agrega un identificador único (_id) para cada documento en una colección 
});


module.exports = mongoose.model("users", usersSchema);
