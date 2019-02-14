const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 5000 || process.env.PORT;

//BODYPARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES
const token = require("./routes/token");
app.use("/token", token);

const payment = require("./routes/payment");
app.use("/payment", payment);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
