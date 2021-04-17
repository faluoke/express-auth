const express = require('express');
const router = express.Router();
const controller = require('./userController');

router.post("/register", (req, res) => {
    controller.registerUser(req, res)
});

router.post("/login", (req, res) => {
    controller.loginUser(req, res)
});

router.get("/", require("./verifyTokenMiddleware"), (req, res) => {
    controller.getAuthStatus(req, res);
  });
  
module.exports = router;