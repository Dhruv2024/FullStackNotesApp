const express = require('express');
const { createUser, login, getUserDetail, sendOtp } = require('../controllers/User');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", login);
router.post("/verify-email", sendOtp);
router.get("/userDetails", auth, getUserDetail);

module.exports = router;