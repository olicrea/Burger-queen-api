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


class usersCrud {
    constructor() {
        this.model = mongoose.model('users', usersSchema); // O: 'users' es la colección en la db
    }

    // O: métodos de instancia - https://mongoosejs.com/docs/guide.html#methods
    async listUsers(){
        const result = await this.model.find({});
        return result;
        // O: Query.prototype.limit()
        // O: query.limit(10);
        // O: Un objeto de tipo Query en Mongoose representa una consulta que se puede ejecutar en la base de datos. No es el resultado de la consulta en sí, sino una representación de la consulta que se puede modificar o ejecutar más adelante.
    }

    async adminUserFind(){
        try {
            const result = await this.model.find({ role: 'admin'});
            return result;
        }
        catch(error){
            console.error(error);
        }
    } 

    async createUser(user){
        const result = await this.model.create(user);
        console.log(result);
        return result;
    }

    async getInformationUserId(id){
        const result = await this.model.findById({ _id: id });
        return result;
    }

    async getInformationUserEmail(email){
        const result = await this.model.findOne({ email: email });
        return result;
    }

    async modifyUserId(id, update){
        const result = await this.model.findByIdAndUpdate({ _id: id }, update);
        return result;
    }

    async modifyUserEmail(email, update){
        const result = await this.model.findOneAndUpdate({ email: email }, update); 
        // O: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        return result;    
    }

    async deleteUserId(id){
        const result = await this.model.findByIdAndDelete({ _id: id });
        return result;    
    }

    async deleteUserEmail(email){
        const result = await this.model.findOneAndDelete({ email: email });
        return result;    
    }
}

module.exports = { usersCrud };
