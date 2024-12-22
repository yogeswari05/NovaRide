const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklistToken.model')
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
   if(!token) {
      return res.status(401).json({ error: "Unauthorized" });
   }
   const isBlackListed = await blacklistModel.findOne({ token: token }); // enhances security
   if (isBlackListed) {
      return res.status(401).json({ message: "Unauthorized" });
   }
   
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded._id);
      req.user = user;
      console.log("User authenticated successfully");
      next();

   } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
   } 
}

module.exports.authCaptain = async (req, res, next) => {
   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
   if(!token) {
      return res.status(401).json({ error: "Unauthorized" });
   }
   const isBlackListed = await blacklistModel.findOne({ token: token }); // enhances security
   if (isBlackListed) {
      return res.status(401).json({ message: "Unauthorized" });
   }
   
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const captain = await captainModel.findById(decoded._id);
      req.captain = captain;
      console.log("Captain authenticated successfully");
      next();

   } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
   } 
}