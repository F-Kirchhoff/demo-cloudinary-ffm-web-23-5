import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(request, response) {
  if (request.method === "POST") {
    const form = formidable({});
    const [, files] = await form.parse(request);
    console.log(files);

    const image = files.file[0];

    const cloudinaryResponse = await cloudinary.uploader.upload(
      image.filepath,
      {
        public_id: image.newFilename,
      }
    );

    console.log("API: response from cloudinary: ", cloudinaryResponse);

    response.status(200).json(cloudinaryResponse);
    return;
  }

  response.status(405).json({ message: "Method not allowed." });
}
