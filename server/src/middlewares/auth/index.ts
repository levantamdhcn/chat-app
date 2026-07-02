import { NextFunction, Request, Response } from "express";
import passport from "passport";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', function(err, user, info) {
    if(err) return next(err);

    if(!user) return res.status(401).json({ message: "Unauthorized Access - No Token Provided!" });
    req.user = user;
    next();
  })(req, res, next);
};

export { authMiddleware };