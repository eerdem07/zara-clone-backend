const crypto = require("crypto");

const createOTP = () => {
  let OTP = "";
  for (let i = 0; i < 8; i++) {
    OTP += crypto.randomInt(0, 10);
  }

  return OTP;
};

module.exports = createOTP;
