// Step 1: Import the S3Client object and all necessary SDK commands.
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// Step 3: Define the parameters for the object you want to upload.
const params = {
	Bucket: "ambel-media", // The path to the directory you want to upload the object to, starting with your Space name.
	Key: "files/hello-world.txt", // Object key, referenced whenever you want to access this file later.
	Body: "Hello, World!", // The object's contents. This variable is an object, not a string.
	ACL: "public", // Defines ACL permissions, such as private or public.
	// Metadata: {
	// 	// Defines metadata tags.
	// 	"x-amz-meta-my-key": "your-value",
	// },
};

// Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
export const uploadObject = async (uploadParams) => {
	try {
		// Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
		const s3Client = new S3Client({
			endpoint: "https://nyc3.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
			forcePathStyle: false, // Configures to use subdomain/virtual calling format.
			region: "nyc3", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
			credentials: {
				accessKeyId: "DO00WX2AUYLWNM7EG9PB", // Access key pair. You can create access key pairs using the control panel or API.
				secretAccessKey: "zkM0ePXuWqxFU4/pd7g2DJz8jYDdiN1NhD8j5FhAmMw", // Secret access key defined through an environment variable.
			},
		});
		s3Client.middlewareStack.add((next, context) => async (args) => {
			// @ts-ignore
			args.request.headers['Access-Control-Allow-Origin'] = '*';
			const result = await next(args);
			// result.response contains data returned from next middleware.
			return result;
		},
			{
				step: "build"
			})
		const putObject = new PutObjectCommand(uploadParams);
		// putObject.middlewareStack.add((next, context) => async (args) => {
		// 	// @ts-ignore
		// 	args.request.headers["Access-Control-Allow-Origin"] = "http://localhost:3000/";
		// 	const result = await next(args);
		// 	// result.response contains data returned from next middleware.
		// 	return result;
		// },
		// 	{
		// 		step: "build"
		// 	})
		// console.log(uploadParams);
		const data = await s3Client.send(putObject);
		console.log(data)
		// console.log(
		// 	"Successfully uploaded object: " +
		// 		uploadParams.Bucket +
		// 		"/" +
		// 		uploadParams.Key
		// );
		return data;
	} catch (err) {
		console.log("Error", err);
	}
};
