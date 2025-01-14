const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const hbs = require("hbs");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const { formatDone, formatImage } = require("./src/javascript/helperDone");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./src/pages"));

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
  session({
    name: "session-login",
    secret: "bdashjdfbasuidby821ger687vwhjs",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/assets", express.static(path.join(__dirname, "./src/assets")));
app.use("/js", express.static(path.join(__dirname, "./src/javascript")));
hbs.registerPartials(path.join(__dirname, "./src/partials"), function (err) {});
hbs.registerHelper("formatDone", formatDone);
hbs.registerHelper("formatImage", formatImage);
hbs.registerHelper("equal", (a, b) => {
  return a === b;
});

const controllerRender = require("./src/router/roterRender");
const controllerCud = require("./src/router/routerCud");

app.use("/", controllerCud);
app.use("/", controllerRender);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
