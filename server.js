const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("./mongoose");

mongoose
  .connect(dotenv.DATABASE)
  .then(() => {
    console.log("SUCCESSFULLY CONNTECT TO DATABASE!");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(dotenv.PORT, () => {
  console.log(`Server is active on ${PORT}`);
});
