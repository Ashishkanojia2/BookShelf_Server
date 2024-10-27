import cloudinary from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath)
      return console.log("Don't Recive local path from cloudinary module");

    const response = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "Product_Images_ashishDev",
    });
    console.log(
      "From Cloudinary Module located in utils : file uploder Successfully in Cloudinary !!!"
    );

    return response;
  } catch (error) {
    console.log("Error uploading to Cloudinary:", error);

    // If there's an error, still attempt to remove the local file
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};
const deleteOnCloudinary = async (previousFilePath) => {
  try {
    if (!previousFilePath)
      return console.log("Can't Recive Previous path from cloudinary module");

    const response = await cloudinary.v2.uploader.destroy(previousFilePath);
    console.log(
      "From Cloudinary Module located in utls : file DELETED Successfully in Cloudinary !!!"
    );
    return response;
  } catch (error) {
    console.log("Error uploading to Cloudinary:", error);
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
