import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";
import { ICloudinary, ICloudinaryResponse } from "src/interfaces/Cloudinary";
import config from "../../config";

const { CLOUD_NAME, API_KEY, API_SECRET } = config.CLOUDINARY;

export class Cloudinary implements ICloudinary {
  constructor() {
    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET
    })
  }

  uploadImage = async (imageToUpload: string, folder: string): Promise<ICloudinaryResponse> => {
    try {
      const response = await cloudinary.uploader.upload(imageToUpload, {
        folder: folder
      });

      const { url } = response;

      if (!url) {
        unlinkSync(imageToUpload);
        return {
          isSuccess: false,
          message: "Couldn't upload your image at the moment. Please try again later.",
          statusCode: 400,
        }
      }

      unlinkSync(imageToUpload);
      return {
        isSuccess: true,
        message: "Successfully uploaded image.",
        statusCode: 200,
        imageURL: url,
      }
    } catch (error) {
      unlinkSync(imageToUpload);
      return {
        isSuccess: false,
        message: "Internal Server Error",
        statusCode: 500,
      };
    }
  };

  deleteImage = async (images: string[]) => {
    try {
      const response = await cloudinary.api.delete_resources(images);

      if(response) {
        return {
          isSuccess: true,
          message: "Delete image successfully",
          statusCode: 200,
        }
      } else {
        return {
          isSuccess: false,
          message: "Couldn't delete your image at the moment. Please try again later.",
          statusCode: 400,
        }
      }

    } catch (error) {
      return {
        isSuccess: false,
        message: error instanceof Error ? error.message : error,
        statusCode: 500,
      }
    }
  }
}