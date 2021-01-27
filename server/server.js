const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server side" });
});

require("./app/routes/customer.routes.js")(app);


app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});