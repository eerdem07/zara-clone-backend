const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");

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

exports.changePassword = () => {};
