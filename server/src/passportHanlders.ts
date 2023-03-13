import passport from "passport";
import bcrypt from "bcrypt";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import USER from "./models/user";
import config from "./config";
import { IUser } from "./interfaces/user";

const LocalStrategy = passportLocal.Strategy;
const jwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;

passport.use(new LocalStrategy((email: string, password: string, done) => {
  USER.findOne({ email: email }, async (err: any, user: any) => {
    if (err) {
      done(err);
    };

    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }

    user.validPassword(password).then((result: boolean) => {
      if (result) {
        return done(user);
      }

      return done(undefined, false, {
        message: 'Invalid email or password.',
      });
    }).catch((err: any) => {
      return done(err);
    })
  })
}));

passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: extractJwt.fromExtractors([
        extractJwt.fromUrlQueryParameter('token'),
        extractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: config.env.SECRET_KEY,
    },
    (jwtPayload: any, cb) => {
      USER.findById(jwtPayload.id)
        .then((user: any) => {
          return cb(null, user);
        })
        .catch((err: Error | null) => {
          return cb(err);
        });
    },
  ),
);