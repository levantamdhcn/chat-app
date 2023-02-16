import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUser } from "src/interfaces/user";
import jwt from "jsonwebtoken";
import config from "../../config";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', function(err, user, info) {
    if(err) return next(err);

    if(!user) return res.status(401).json({ message: "Unauthorized Access - No Token Provided!" });
    req.user = user;
    next();
  })(req, res, next);
};

const generateJWT = (payload: IUser) => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(payload, config.env.SECRET_KEY, {
    expiresIn: parseInt((expirationDate.getTime() / 1000).toString(), 10)
  });
};

export { authMiddleware, generateJWT };