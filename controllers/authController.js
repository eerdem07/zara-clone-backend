const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");

const createOTP = require("../utils/otp");
const sendMail = require("../utils/mail");

const bcrypt = require("bcrypt");
const saltrounds = 15;

const createJWT = (payload) => {
  return jsonwebtoken.sign({ _id: payload }, process.env.SECRET_KEY, {
    expiresIn: "10m",
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("password");

    if (!user)
      res.status(401).json({
        status: "fail",
        message: "the user with this given email cant found!",
      });

    const valid = await bcrypt.compare(password, user.password);

    const token = createJWT(user._id.toString());

    if (valid) {
      res
        .cookie("jwt", token, {
          httpOnly: true,
          maxAge: 600000,
          sameSite: "strict",
        })
        .status(200)
        .json({
          status: "succcess",
          message: "succesfully logged in!",
        });
    } else {
      res
        .status(400)
        .json({ status: "fail", message: "email and password wrong" });
    }
  } catch (err) {
    next(err);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { name, surname, email, password, phoneNumber } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(409).json({
        status: "fail",
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltrounds);

    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await newUser.save();

    res
      .status(201)
      .json({ status: "success", message: "User successfully registered" });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  res.cookie("token", "", { expiresIn: new Date(0) });
  res
    .status(200)
    .json({ status: "success", message: "successfully logged out!" });
};

exports.changePassword = async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body;

    if (!email || !password || !newPassword)
      req.status(400).json({
        status: "fail",
        message: "no parameters sent",
      });

    const user = await User.findOne({ email }).select("password");

    if (!user)
      res.status(400).json({
        status: "fail",
        message: "the user with this given email cant not be found!",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      res.status(400).json({
        status: "fail",
        message: "wrong password!",
      });

    user.password = await bcrypt.hash(newPassword, saltrounds);

    await user.save();

    res.status(200).json({
      status: "sucess",
      message: "password changed",
    });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;

    if (!email)
      res.status(400).json({
        status: "fail",
        message: "no mail sent",
      });

    const user = await User.findOne({ email });

    if (!user)
      res.status(400).json({
        status: "fail",
        message: "user can not be found",
      });

    const otp = createOTP();

    user.OTP.code = otp;
    user.OTP.expiresAt = new Date();
    await user.save();

    sendMail(email, "resetPassword", otp, `<h1>Here is your ${otp} code</h1>`);

    res.status(200).json({
      status: "success",
      message: "mail sended",
    });
  } catch (err) {
    next(err);
  }
};
