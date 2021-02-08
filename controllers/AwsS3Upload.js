import AWS from 'aws-sdk';
import uniqid from "uniqid";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const createPresignedPost = ({ key }) => {
  const s3 = new AWS.S3({
	endpoint: new AWS.Endpoint(process.env.AWS_HOST),
  });

  const params = {
	Expires: 60,
	Bucket: process.env.AWS_BUCKET,
	Conditions: [
	  ["starts-with", "$Content-Type", process.env.AWS_CONTENT_TYPE],
	  ["content-length-range", 0, process.env.AWS_MAX_FILE_SIZE]
	],
	Fields: { key }
  };

  return s3.createPresignedPost(params);
};

const validate = (contentType, size) => {
  const validContentType = process.env.AWS_CONTENT_TYPE.includes(contentType);
  return !(!validContentType || size > process.env.AWS_MAX_FILE_SIZE);
};

export const getPresignedPostData = (name, size, contentType) => {
  const valid = validate(contentType, size);
  if(valid){
	return createPresignedPost({
	  key: `${uniqid()}_${name}`,
	  contentType,
	});
  } else {
   throw Error('Invalid content type on size!');
  }
};
