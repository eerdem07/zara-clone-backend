const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltrounds = 15;

const AppError = require("../utils/AppError");

const createJWT = (id, role) => {
  return jsonwebtoken.sign({ _id: id, role: role }, process.env.SECRET_KEY, {
    expiresIn: "10m",
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("password role");

    if (!user) throw new AppError("please fullfil email or password", 400);

    const valid = await bcrypt.compare(password, user.password);

    const token = createJWT(user._id.toString(), user.role);

    if (valid) {
      res
        .cookie("jwt", token, {
          httpOnly: true,
          maxAge: 600000,
          sameSite: "strict",
        })
        .status(200)
        .json({
          status: "success",
          message: "successfully logged in!",
        });
    } else {
      res
        .status(400)
        .json({ status: "fail", message: "email or password wrong" });
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
      throw new AppError("User already exists", 409);
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
    .json({ status: "success", message: "Successfully logged out!" });
};

exports.authorize = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);

      if (!roles.includes(decoded.role)) {
        throw new AppError(
          "You dont have permission to access to this route",
          400
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
