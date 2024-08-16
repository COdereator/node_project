const express = require("express");
const { router } = require("./Routes/router");
const { connectMongo } = require("./Connection/Connect");
const passport = require("passport");
const { URL } = require("./Models/models");
const localStrategy = require("passport-local").Strategy;
// creating app
const app = express();

// connection of mongo
connectMongo("mongodb://localhost:27017/short-url").then(() => {
  console.log("Connected to MongoDB");
});

// using data from the body
app.use(express.json());

const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

app.use(passport.initialize());

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      console.log("Recieved Credentials ", username, password);
      const user = await URL.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });

        const isPasswordmatch = user.password === password ? true : false;
        if (isPasswordmatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      }
    } catch (err) {
      return done(err);
    }
  })
);

const authorize = passport.authenticate("local", { session: false });

app.get("/", authorize, (req, res) => {
  res.send("Hello World");
});

app.use("/user", router);

app.listen(8081, () => {
  console.log("Listening to the port....");
});
