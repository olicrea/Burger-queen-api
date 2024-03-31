const { default: mongoose } = require("mongoose");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String
  },
  user: {
    id: {
      type: Number
    },
    role: {
      type: String
    }
  },
  error: {
    type: String
  }

});

module.exports = mongoose.model("auth", authSchema);

//POST-LOGIN: 200, 400, 404