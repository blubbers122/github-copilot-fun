// connects to an S3 bucket and uploads a file
import AWS from "aws-sdk";

const uploadToS3 = (file, bucket, key) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: bucket,
    Key: key,
    Body: file,
    ACL: "public-read",
  };
  return s3.upload(params).promise();
};
