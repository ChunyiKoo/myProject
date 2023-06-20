const AWS = require("aws-sdk");
//const multer = require("multer");

AWS.config.update({
 //  accessKeyId: "",
 //  secretAccessKey: "",
 signatureVersion: "v4",
 region: "us-east-2", // Specify the correct region here
});
//If you use an incorrect signature version, you will not be able to authenticate your requests to AWS services 4.

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const NAME_OF_BUCKET = "app-happy-bucket";
const fs = require("fs");
//const path = require("path");
//const filePath = path.resolve("cabin-by-lake.jpg");
const filePath = "/root/appAcademy/helen/happybnb/backend/db/s3/";

//seeder

// const SingleSeedUpload = async (file) => {
//  const params = {
//   Bucket: NAME_OF_BUCKET,
//   Key: file.name,
//   Body: fs.readFileSync(file.path),
//  };
//  return await s3.upload(params).promise();
// };

const MultipleSeedsUpload = () => {
 const files = [
  {
   name: "beach_house_1.jpg",
   path: filePath + "beach_house_1.jpg",
  },
  {
   name: "farm_cottage_1.jpg",
   path: filePath + "farm_cottage_1.jpg",
  },
  {
   name: "endless_summer_1.jpg",
   path: filePath + "endless_summer_1.jpg",
  },
  {
   name: "lake_view_glen_1.jpg",
   path: filePath + "lake_view_glen_1.jpg",
  },
  {
   name: "ybor_fall_1.jpg",
   path: filePath + "ybor_fall_1.jpg",
  },
  {
   name: "historic_house_1.jpg",
   path: filePath + "historic_house_1.jpg",
  },
  {
   name: "romantic_getaway_1.jpg",
   path: filePath + "romantic_getaway_1.jpg",
  },
  {
   name: "home_oroville_1.jpg",
   path: filePath + "home_oroville_1.jpg",
  },
  {
   name: "riverfront_house_1.jpg",
   path: filePath + "riverfront_house_1.jpg",
  },
  {
   name: "mountain_house_1.jpg",
   path: filePath + "mountain_house_1.jpg",
  },
  {
   name: "lake_cabin_1.jpg",
   path: filePath + "lake_cabin_1.jpg",
  },
  {
   name: "home_sandiego_1.jpg",
   path: filePath + "home_sandiego_1.jpg",
  },
  {
   name: "beach_house_2.jpg",
   path: filePath + "beach_house_2.jpg",
  },
  {
   name: "beach_house_3.jpg",
   path: filePath + "beach_house_3.jpg",
  },
  {
   name: "beach_house_4.jpg",
   path: filePath + "beach_house_4.jpg",
  },
  {
   name: "beach_house_5.jpg",
   path: filePath + "beach_house_5.jpg",
  },
  {
   name: "farm_cottage_2.jpg",
   path: filePath + "farm_cottage_2.jpg",
  },
  {
   name: "farm_cottage_3.jpg",
   path: filePath + "farm_cottage_3.jpg",
  },
  {
   name: "farm_cottage_4.jpg",
   path: filePath + "farm_cottage_4.jpg",
  },
  {
   name: "farm_cottage_5.jpg",
   path: filePath + "farm_cottage_5.jpg",
  },
 ];

 console.log("files", files);

 files.forEach((file) => {
  const params = {
   Bucket: NAME_OF_BUCKET,
   Key: file.name,
   Body: fs.readFileSync(file.path),
  };
  s3.upload(params, (err, data) => {
   if (err) {
    console.error("Error uploading file:", err);
   } else {
    console.log("File uploaded successfully:", data.Location);
   }
  });
 });
};

MultipleSeedsUpload();
