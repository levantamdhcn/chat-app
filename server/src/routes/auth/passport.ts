import passport from "passport";
import passportLocal from "passport-local";
import User from "../../models/user";

const localStrategy = passportLocal.Strategy;

// Create a passport middleware to handle User login
passport.use("login", new localStrategy({
  usernameField: "email",
  passwordField: "password",
}, (email: string, password: string, done) => {
  return User.create({ email, password }, (error, user) => {
    if (error) {
      return done(error);
    }

    return done(null, user);
  })
}));