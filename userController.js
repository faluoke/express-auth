const User = require("./user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validation = require('./validation');
const { exist, valid } = require("joi");

const registerUser = async (req, res) => {
    const user = req.body;
    const { error } = validation.ValidateRegistration(user);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne( {email: user.email} );
    if (emailExists) return res.status(400).json({message: 'Email already exists'});

    const salt = bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword
    });

    try {
        await newUser.save();
    } catch (err) {
        res.status(400).send(err);
    }
};

const loginUser = async (req, res) => {
    const user = req.body;
    const {error} = validation.ValidateLogin(user);
    if (error) return res.status(400).send(error.details[0].message);

    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
        return res.status(401).json({ message: "Email or password does not match" });
    }
    
    try {
        const validPassword = await bcrypt.compare(user.password, existingUser.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Email or password does not match" });
        }
    } catch(err) {
        return res.status(400).send(err);
    }

    const token = jwt.sign({_id: existingUser._id}, process.env.TOKEN_SECRET, {
        expiresIn: "600s"
    });
    res.header("auth-token", token);

    res.status(200).json({
        message: `${existingUser.firstName} ${existingUser.lastName} is logged in successfully`,
        token: token,
        email: user.email,
      });
} 

const getAuthStatus = (req, res) => {
    res.status(200).json({
      message: "Successfully Authenticated",
      authenticated: true,
    });
  };
  
  module.exports = { registerUser, loginUser, getAuthStatus };