import JWT from 'jsonwebtoken';
import config from '../../config';

export default interface IAuthService {
  login: (email: string, password: string) => Promise<object | undefined>;
  forgot: (email: string) => Promise<string>;
  refreshToken: (password: string, token: string) => Promise<string | object>;
}

export class AuthService {
  static generateTokens(payload: string | object | Buffer | any): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = JWT.sign(
      payload,
      config.env.SECRET_KEY,
      { expiresIn: config.env.JWT_ACCESS_EXPIRE }
    );
    const refreshToken = JWT.sign(
      payload,
      config.env.REFRESH_KEY,
      { expiresIn: config.env.JWT_REFRESH_EXPIRE }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  static verifyAccessToken(token: string): { err: JWT.VerifyErrors | null, result: string | JWT.JwtPayload | undefined } {
    try {
      let tokenData: { err: JWT.VerifyErrors | null, result: string | JWT.JwtPayload | undefined } = { err: null, result: undefined };
      JWT.verify(token, config.env.SECRET_KEY, (err, result) => {
        tokenData.err = err;
        tokenData.result = result;
      });

      return tokenData;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Uncaught message");
    }
  }

  static verifyRefreshToken(token: string): Promise<{ _id: string }> {
    const tokenData = JWT.verify(token, config.env.REFRESH_KEY);
    // @ts-ignore
    return { _id: tokenData._id };
  }
}
