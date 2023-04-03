import { CreatedUser } from "../../interfaces/user";
import JWT from "jsonwebtoken";
import config from "../../config";

export default interface IAuthService {
  login: (email: string, password: string) => Promise<object | undefined>;
  forgot: (email: string) => Promise<string>;
  refreshToken: (password: string, token: string) => Promise<string | object>;
}

export class AuthService {
  static generateTokens(payload: string | object | Buffer | any): {
    accessToken: string,
    refreshToken: string
  } {
    const accessToken = JWT.sign(payload.toJSON(), config.env.SECRET_KEY, { expiresIn: config.env.JWT_ACCESS_EXPIRE });
    const refreshToken = JWT.sign(payload.toJSON(), config.env.REFRESH_KEY, { expiresIn: config.env.JWT_REFRESH_EXPIRE });

    return {
      accessToken,
      refreshToken
    }
  };

  static verifyAccessToken(token: string): Promise<{ _id: string }> {
    const tokenData = JWT.verify(token, config.env.SECRET_KEY);
    // @ts-ignore
    return { _id: tokenData._id };
  }

  static verifyRefreshToken(token: string): Promise<{ _id: string }> {
    const tokenData = JWT.verify(token, config.env.SECRET_KEY);
    // @ts-ignore
    return { _id: tokenData._id };
  }
}