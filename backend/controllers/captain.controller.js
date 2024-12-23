const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      const { fullname, email, password, vehicle } = req.body;
      const isCaptainAlreadyRegistered = await captainModel.findOne({ email });
      if(isCaptainAlreadyRegistered) {
         return res.status(400).json({ error: "Captain already registered" });
      }
      const hashedPassword = await captainModel.hashPassword(password);
      const captain = await captainService.createCaptain({
         firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedPassword,
         color: vehicle.color, plate: vehicle.plate, capacity: vehicle.capacity, vehicleType: vehicle.vehicleType, location: vehicle.location.lat, location: vehicle.location.lng
      });
      const token = await captain.generateAuthToken();
      res.status(201).json({ captain, token });
      console.log("Captain registered successfully");
   } catch (error) {
      next(error);
   }
}

module.exports.loginCaptain = async (req, res, next) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      const { email, password } = req.body;
      const captain = await captainModel.findOne({ email }).select("+password");
      if(!captain) {
         return res.status(400).json({ error: "Captain not found" });
      }
      const isMatch = await captain.comparePasswords(password, captain.password);
      if(!isMatch) {
         return res.status(400).json({ error: "Invalid credentials" });
      }
      const token = await captain.generateAuthToken();
      res.cookie("token", token);
      res.status(200).json({ captain, token });
      console.log("Captain logged in successfully");
   } catch (error) {
      next(error);
   }
}

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain); // req.user would be set by the middleware.
};


module.exports.logoutCaptain = async (req, res, next) => {
   const token = req.cookies.token || req.headers.authorization.split(" ")[1];
   res.clearCookie("token");

   try {
     await BlacklistToken.create({ token });
     res.status(200).json({ message: "Captain logged out successfully" });
   } catch (error) {
     next(error);
   }
}
