const userModel = require('../models/user.model');
const userService = require('../services/user.service'); // creates a user given details
const { validationResult } = require('express-validator'); 


module.exports.registerUser = async (req, res, next) => {
   console.log("register route"); 
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      const { fullname, email, password } = req.body;
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
   console.log("login route"); 
   const errors = validationResult(req);
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
      res.status(200).json({ user, token });
      console.log("User logged in successfully");
   } catch (error) {
      next(error);
   }
}