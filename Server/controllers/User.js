const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, otp } = req.body;
        if (!name || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password not matched",
            })
        }

        //check whether he is existing user or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(404).json({
                success: false,
                message: "User already exists",
            })
        }

        //check whether entered otp is valid or not
        const recentOtpResponse = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("Response while fetching recent otp => ", recentOtpResponse);
        if (recentOtpResponse.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        } else if (otp !== recentOtpResponse[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }

        //hash the password
        let hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Try again later",
            error: err.message,
        })
    }
}

//login the user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fill both fields!",
            })
        }

        const user = await User.findOne({ email }).populate("notes").exec();
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist",
            })
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );

            user.token = token;
            user.password = undefined;

            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user: {
                    name: user.name,
                    email: user.email
                },
                message: `User Login Success`,
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: `Incorrect Password`,
            });
        }
    }
    catch (err) {
        console.error(err);
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }
}

exports.getUserDetail = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById({ _id: userId }).populate("notes").exec();
        if (!user) {
            console.log("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }


        return res.status(200).json({
            success: true,
            message: "Information found",
            user,
        })

    }
    catch (err) {
        return res.status(503).json({
            success: false,
            erro: err.message,
            message: "Something went wrong while fetching user details",
        })
    }
}

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User is already registered",
            })
        }

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const result = await OTP.findOne({ otp: otp });
        console.log("Result is Generate OTP Func");
        console.log("OTP", otp);
        console.log("Result", result);
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
        }

        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        console.log("Otp sent => ", otpBody);
        return res.status(200).json({
            success: true,
            message: "Otp Sent successfully",
            otp,
        })
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}