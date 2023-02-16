import { IUser } from "src/interfaces/user";
import { Post, Body} from "tsoa";
import USER from "../../models/user";

class AuthController {
    constructor() {

    };

    @Post("/registration")
    public async registration(@Body() user: IUser) {
      try {
        const u = await USER.findOne({ email: user.email });
        if (u) {
          throw new Error("User with this email is exist!");
        };

        const newUser = new USER({
          ...user,
          email: user.email.toLowerCase(),
        });
        
        let createdUser = await newUser.save();

        return {
          token: createdUser.generateJWT(),
          user: createdUser,
        };
      } catch (error) {
        console.log(error);
      };
    };

    @Post("/login")
    public async login(@Body() email: string, password: string) {
      try {
        if(!email) {
          throw new Error("Email is required");
        };

        const u = await USER.findOne({ email });
        if(!u) throw new Error(`User with email ${email} is not exist`);

        if(!u.validPassword(password)) {
          throw new Error("Invalid password!");
        };

        return {
          token: u.generateJWT(),
          user: u
        }
      } catch (error) {
        console.log(error);
      }
    };
};

export default new AuthController();