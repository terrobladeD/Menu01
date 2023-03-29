const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();

var corsOptions = {
  origin: ["http://localhost:8081", "http://localhost:8082"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Menu project" });
});

require("./app/routes/dish.router")(app);
require("./app/routes/order.router")(app);

// method to handle the image query from api
const imagesPath = path.join(__dirname, 'images/dishes');
app.use('/images', express.static(imagesPath));

// method to use email
// to do : cannot use SMTP now need to use Oauth2.0 in next iteration
// app.use(require('./app/routes/emailRoutes'))

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
