const express = require('express'); // imported express
const User = require('../models/User'); // imported user from models
const router = express.Router();    // imported router
const { body, validationResult } = require('express-validator');    // imported express validator to check for validations

// Create a User using: POST "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),    // name must be of atleast length: 3
    body('email', 'Enter a valid email').isEmail(), // email must be valid
    body('password', 'Enter a valid password').isLength({ min: 8 }),    // password must be of length 8
], async (req, res) => {
    // check of validationResult, i.e. if any error then simply return
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        let user_name = await User.findOne({name: req.body.name});  // checking wheather username exists or not 
        let user_email = await User.findOne({email: req.body.email});   // checking wheather email exists or not

        if(user_name) { // is username exists, must return error because email must be unique..
            // console.log(user_name);
            return res.status(400).json({ error: 'Please Enter a unique username' });
        }else if(user_email) {  // if email exists, must return error because email must be unique..
            return res.status(400).json({ error: 'Email already exists' });
        }

        let user = await User.create({  // if there is no such error creating the user
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        res.json({user})    // sending the response in json(objects) format
    }catch(err){
        console.error(err.message); // else simply return error
        res.status(500).send("Some error occurred")
    }
})

module.exports = router;