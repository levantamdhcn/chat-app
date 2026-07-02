import { Get, Inject } from "@tsoa/runtime";
import { Route, Body, Put, Delete, Path } from "tsoa";
import { CreatedUser, IUser, IUserResponse } from "../../interfaces/user";
import User from "../../models/user";
import IUserService from "../../services/user";
import { cloudinaryInstance } from "../../utils/cloudinary";
import config from "../../config";

@Route("user")
class UserController implements IUserService {
  constructor() {
    
  }

  @Get()
  public async get(): Promise<IUserResponse[] | undefined> {
    try {
      const users = await User.find({});

      return users;
    } catch (error) {
      console.log(error);
    }
  };

  @Get("{userId}")
  public async getOne(userId: string): Promise<IUserResponse | undefined> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User is not exist");
      };

      return user;
    } catch (error) {
      console.log(error);
    }
  };

  @Put("{userId}")
  public async update(@Body() data: IUser, userId: string, @Inject() localFilePath: string): Promise<IUserResponse | undefined> {
    try {
      const u = await User.findById(userId);
      if (!u) {
        throw new Error("User is not exist");
      };

      if(data.avatar) {
        const cloudPath = `${config.CLOUDINARY.FOLDER_NAME}/${data.email}`;
        const { isSuccess, imageURL } = await cloudinaryInstance.uploadImage(localFilePath, cloudPath);
        if(isSuccess) {
          data.avatar = imageURL;
        };
      }
      
      const updatedU = await User.findByIdAndUpdate(userId, data, { new: true });

      if (updatedU) {

        return updatedU;
      } else {
        throw new Error("Update failed");
      };
    } catch (error) {
      console.log(error);
    }
  };

  @Delete("{userId}")
  public async delete(@Path() userId: string): Promise<IUserResponse | undefined> {
    try {
      const u = await User.findById(userId);
      if (!u) {
        throw new Error("User is not exist");
      };

      await User.findByIdAndDelete(userId);

      if(u?.avatar && u.avatar !== "") {
        await cloudinaryInstance.deleteImage([u.avatar]);
      }

      return u;
    } catch (error) {
      console.log(error);
    }
  }

  @Get("/search/{searchValue}")
  public async search(@Path() searchValue: string): Promise<CreatedUser[] | undefined> {
    if (searchValue === "") return await User.find();
    
    return await User.find({
      $or: [
        {
          firstName: { $regex: '.*' + searchValue + '.*'  },
        },
        {
          lastName: { $regex: '.*' + searchValue + '.*'  },
        },
        {
          email: { $regex: '.*' + searchValue + '.*'  }
        }
      ],
    })
  }
}

export = new UserController();