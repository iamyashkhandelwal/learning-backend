// we have to run this file as well always ---->learning-backend/mongoose node app.js
const mongoose = require("mongoose");

// connecting to the database named 'learning-backend'
// Database will be visible in compass only if it has atleast a collection or an entry
mongoose.connect('mongodb://localhost:27017/learning-backend')
.then(() => console.log('connected to database!!!'))
.catch(() => console.log('error connecting database'))

// Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  password: String,
  confirmPassword: String,
  age: Number,
})


// To use our schema definition, we need to convert our blogSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):


// 1st paramenter is model name -> it shoul always be singular (Collection in the database)
// in the mongodb compass User -> users
const User = new mongoose.model("User", userSchema)
module.exports = User;  // to export the Model

// const newUser = new User({
//   name: 'Yash',
//   age: 21,
//   email: 'yash@gmail.com',
//   password: '12345678',
//   cofirmPassword: '123456789',
// });

// newUser.save();