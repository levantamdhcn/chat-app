import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let error = {};
    errors.array().map(err => {
      error = {
        ...error,
        [err.param]: err.msg,
      };
      return res.status(422).json({ error });
    });
  };

  next();
};

export default validateMiddleware;