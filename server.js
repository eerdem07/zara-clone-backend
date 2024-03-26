const app = require("./app");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("SUCCESSFULLY CONNTECT TO DATABASE!");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is active on ${process.env.PORT}`);
});