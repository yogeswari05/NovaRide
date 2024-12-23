const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
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
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
   },
   password: {
      type: String,
      required: true,
      select: false,
   },
   socketId: {
      type: String,
   },
   status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
   },
   vehicle: {
      color: {
         type: String,
         required: true,
         minlength: [1, "Color must be at least 1 character long"],
      },
      plate: {
         type: String,
         required: true,
         minlength: [3, "Plate must be at least 3 character long"],
      },
      capacity: {
         type: Number,
         required: true,
      },
      vehicleType: {
         type: String,
         required: true,
         enum: ["car", "motorcycle", "auto"],
      },
      location: {
         lat: {
            type: Number,
         },
         lng: {
            type: Number,
         },
      }
   }
})

captainSchema.methods.generateAuthToken = function() {
   const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
   return token;
}

captainSchema.methods.comparePasswords = async (password, hashedPassword) => {
   return await bcrypt.compare(password, hashedPassword);
}

captainSchema.statics.hashPassword = async (password) => {
   return await bcrypt.hash(password, 10);
}

const Captain = mongoose.model('Captain', captainSchema);
module.exports = Captain;