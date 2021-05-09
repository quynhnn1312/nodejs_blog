const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");

const sortMiddleware = require("./app/middlewares/sortMiddleware");

const route = require("./routes");
const db = require("./config/db");

//connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

//custom middleware
app.use(sortMiddleware);

// HTTP logger
// app.use(morgan("combined"));

//template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: require("./helpers/handlebars"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

// route
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
