import { PassportStatic } from "passport";
import passportJwt from "passport-jwt";
import config from "src/config";
import USER from "../../models/user";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.env.SECRET_KEY,
};

const passportJwtMiddleware = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      USER.findById(jwt_payload._id).then(user => {
        if (user) return done(null, user);
        return done(null, false);
      }).catch(error => {
        return done(error, false, { message: "Server Error!" })
      });
    })
  )
};

export default passportJwtMiddleware;

