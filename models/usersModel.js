const { default: mongoose } = require("mongoose");

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
        //lowercase: true
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


const usersCrud = ()=>{
    const model = mongoose.model('users', usersSchema); // O: 'users' es la colección en la db

    // O: métodos de instancia - https://mongoosejs.com/docs/guide.html#methods
    const listUsers = async ()=>{
        const result = await model.find({});
        return result;
        // O: Query.prototype.limit()
        // O: query.limit(10);
        // O: Un objeto de tipo Query en Mongoose representa una consulta que se puede ejecutar en la base de datos. No es el resultado de la consulta en sí, sino una representación de la consulta que se puede modificar o ejecutar más adelante.
    };

    const adminUserFind= async ()=>{
        const result = await model.find({ role: 'admin'});
        return result;
    }; 

    const createUser = async (user)=>{
        const result = await model.create(user);
        return result;
    };

    const getInformationUserId = async (id)=>{
        const result = await model.findById({ _id: id });
        return result;
    };

    const getInformationUserEmail = async (email)=>{
        const result = await model.findOne({ email: email });
        return result;
    };

    const modifyUserId = async (id, update)=>{
        const result = await model.findByIdAndUpdate({ _id: id }, update);
        return result;
    };

    const modifyUserEmail = async (email, update)=>{
        const result = await model.findOneAndUpdate({ email: email }, update); 
        // O: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        return result;    
    };

    const deleteUserId = async (id)=>{
        const result = await model.findByIdAndDelete({ _id: id });
        return result;    
    };

    const deleteUserEmail = async (email)=>{
        const result = await model.findOneAndDelete({ email: email });
        return result;    
    };

    return {
        listUsers,
        adminUserFind,
        createUser,
        getInformationUserId,
        getInformationUserEmail,
        modifyUserId,
        modifyUserEmail,
        deleteUserId,
        deleteUserEmail 

    };
};

module.exports = { usersCrud };
