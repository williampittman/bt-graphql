const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 5000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const token = require("./routes/token");
app.use("/token", token);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
