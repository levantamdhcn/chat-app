import { Get } from "@tsoa/runtime";
import { Route, Post, Body, Put, Delete } from "tsoa";
import { CreatedUser, IUser } from "../../interfaces/user";
import User from "../../models/user";
import IUserService from "../../services/user";
import mongoose from "mongoose";
import config from "../../config";

@Route("user")
class UserController implements IUserService {
  constructor() {
    
  }

  @Get()
  public async get() {
    try {
      const users = await User.find({});

      return users;
    } catch (error) {
      console.log(error);
    }
  };

  @Get("{userId}")
  public async getOne(userId: string) {
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
  public async update(@Body() data: IUser, userId: string) {
    try {
      const u = await User.findById(userId);
      if (!u) {
        throw new Error("User is not exist");
      };


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
  public async delete(userId: string) {
    try {
      const u = await User.findById(userId);
      if (!u) {
        throw new Error("User is not exist");
      };

      await User.findByIdAndDelete(userId);

      return u;
    } catch (error) {
      console.log(error);
    }
  }
}

export = new UserController();