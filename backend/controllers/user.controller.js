const userModel = require('../models/user.model');
const userService = require('../services/user.service'); // creates a user given details
const BlacklistToken = require('../models/blacklistToken.model');
const { validationResult } = require('express-validator'); 


module.exports.registerUser = async (req, res, next) => {
   console.log("register route"); 
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      console.log("errors", errors);
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      const { fullname, email, password } = req.body;
      const isUserAlreadyRegistered = await userModel.findOne({ email });
      if (isUserAlreadyRegistered) {
         console.log("User already registered");
         return res.status(400).json({ error: "User already registered" });
      }
      const hashedPassword = await userModel.hashPassword(password);
      const user = await userService.createUser({ firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedPassword });
      const token = await user.generateAuthToken();
      res.status(201).json({ user, token });
      console.log("User registered successfully");
   } catch (error) {
      next(error);
   }
}

module.exports.loginUser = async (req, res, next) => {
   const errors = validationResult(req);
   console.log("login errors..", errors);

   if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email }).select("+password");
      if(!user) {
         return res.status(401).json({ error: "Invalid email or password" });
      }
      const isMatch = await user.comparePasswords(password, user.password);
      if(!isMatch) {
         return res.status(401).json({ error: "Invalid email or password" });
      }
      const token = await user.generateAuthToken();
      res.cookie("token", token, { httpOnly: true });
      res.status(201).json({ user, token });
      console.log("User logged in successfully");
   } catch (error) {
      next(error);
   }
}

module.exports.getUserProfile = async (req, res, next) => {
   res.status(200).json(req.user); // req.user would be set by the middleware.
}

module.exports.logoutUser = async (req, res, next) => {
   console.log("logout route");
   const token = req.cookies.token || req.headers.authorization.split(' ')[1];
   res.clearCookie("token");
   
   try {
      const isBlackListed = await BlacklistToken.findOne({ token });
      if (!isBlackListed) {
         await BlacklistToken.create({ token });
      }
      res.status(200).json({ message: "User logged out successfully" });
   } catch (error) {
      next(error);
   }
}