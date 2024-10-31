const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");

const sendMail = require("../utils/mail");

const bcrypt = require("bcrypt");
const saltrounds = 15;

const AppError = require("../utils/AppError");

const crypto = require("crypto");

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

exports.changePassword = async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body;

    if (!email || !password || !newPassword)
      throw new AppError("No parameters sent", 400);

    const user = await User.findOne({ email }).select("password");

    if (!user)
      throw new AppError(
        "The user with this given email cant not be found!",
        400
      );

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new AppError("wrong password!", 400);

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
    const { email } = req.body;

    if (!email) throw new AppError("no mail sent", 400);

    const user = await User.findOne({ email });

    if (!user) throw new AppError("user can not be found", 400);

    const token = crypto.randomBytes(20).toString("hex");

    const url = `http://wwww.${process.env.HOST}:${process.env.PORT}/resetPassword/${token}`;

    sendMail(user.email, "resetPassword", "Here is your URL", url);

    user.passwordResetToken = token;
    user.passwordResetTokenExpires = Date.now() + 3600000;

    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Mail sent",
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params.token;

    if (!token || !newPassword) {
      throw new AppError("Email or Token isnt provided!", 400);
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    if (!user) throw new AppError("User cant be found!", 400);

    const hashedPassword = await bcrypt.hash(password, saltrounds);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    await user.save();

    res.status(201).json({
      status: "Success",
      message: "Password succesfully changed!",
    });
  } catch (err) {
    next(err);
  }
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
