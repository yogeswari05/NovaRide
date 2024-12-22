const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
   fullname: {
      firstname: {
         type: String,
         required: true,
         minlength: [1, "Firstname must be at least 1 character long"],
      },
      lastname: {
         type: String,
         minlength: [1, "Lastname must be at least 1 character long"],
      },
   },
   email: {
      type: String,
      required: true,
      unique: true,
      minlength: [1, "Email must be at least 1 characters long"],
   },
   password: {
      type: String,
      required: true,
      select: false,
   },
   socketId: {
      type: String,
   },
   
});

UserSchema.methods.generateAuthToken = function() {
   const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
   return token;
}

UserSchema.methods.comparePasswords = async (password, hashedPassword) => {
   return await bcrypt.compare(password, hashedPassword);
}

UserSchema.statics.hashPassword = async (password) => {
   return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;