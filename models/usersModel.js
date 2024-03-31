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
        this.model = mongoose.model('user', usersSchema);
    }

    async listUsers(){
        const result = await this.model.find({});
        return result;
    } 

    async createUser(users){
        const result = await this.model.create(users);
        return result;
    }

    async getInformationUserId(){
        const result = await this.model.findById(id);
        return result;
    }

    async getInformationUserEmail(){
        const result = await this.model.findOne(email);
        return result;
    }

    async modifyUserId(){
        const result = await this.model.findByIdAndUpdate(id);
        return result;
    }

    async modifyUserEmail(){
        const result = await this.model.findOneAndUpdate(email);
        return result;    }

    async deleteUserId(){
        const result = await this.model.findByIdAndDelete(id);
        return result;    }

    async deleteUserEmail(){
        const result = await this.model.findOneAndDelete(email);
        return result;    }
}

module.exports = { usersCrud };

// const show = async ()=>{
//     const users = await usersModel.find();
//     console.log(users);
// }
// show();
    // const usersModel = mongoose.model('user', usersSchema);
