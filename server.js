const app = require("./app");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("SUCCESSFULLY CONNTECTED TO DATABASE!");
  } catch (err) {
    console.error(err);
  }
})();

app.listen(process.env.PORT, () => {
  console.log(`Server is active on ${process.env.PORT}`);
});
