// IMPORT NECESSARY DEPENDENCIES
const express = require("express");
const sequelize = require("./models/db/database-connection");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const routes = require("./controllers");
const helpers = require("./utils/handlebars-helpers");

// INITIALIZE EXPRESS
const app = express();

// SET HANDLEBARS ENGINE
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// HANDLE SESSION CREATION AND CONNECT TO DATABSE
const PORT = process.env.PORT || 3001;
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    // Alternate between main and testing expiration intervals, NOT both.
    checkExpirationInterval: 300000, // main - 5 minutes
    expiration: 300000               // main - 5 minutes
    // checkExpirationInterval: 5000, // testing
    // expiration: 5000               // testing
  }),
};

// CONFIGURE EXPRESS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // will already be looking in public folder, dont reference public in handlebars
app.use(session(sess));
app.use(routes); // this will be used for routes

// ENABLE CONNECTION
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App now running on port ${PORT}`));
});
