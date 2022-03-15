// IMPORT NECESSARY DEPENDENCIES
const express = require("express");
const sequelize = require("./db/database-connection");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const routes = require('./controllers')

// INITIALIZE EXPRESS
const app = express();

// SET HANDLEBARS ENGINE
const hbs = exphbs.create({});
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
  }),
};

// CONFIGURE EXPRESS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));
app.use(routes); // this will be used for routes 

// ENABLE CONNECTION
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App now running on port ${PORT}`));
});
