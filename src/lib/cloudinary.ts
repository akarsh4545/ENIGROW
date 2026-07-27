import { v2 as cloudinary } from "cloudinary";

function assertCloudinaryEnv() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Missing Cloudinary env vars. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local.",
    );
  }

  return { cloudName, apiKey, apiSecret };
}

let configured = false;

export function getCloudinary() {
  if (!configured) {
    const { cloudName, apiKey, apiSecret } = assertCloudinaryEnv();
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    configured = true;
  }

  return cloudinary;
}

export type CloudinaryFolder =
  | "avatars"
  | "documents"
  | "media"
  | "blog"
  | "services"
  | "schemes"
  | "gallery"
  | "misc";

export type UploadResult = {
  publicId: string;
  url: string;
  secureUrl: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
  resourceType: string;
};

export async function uploadBuffer(options: {
  buffer: Buffer;
  folder: CloudinaryFolder;
  filename?: string;
  resourceType?: "image" | "raw" | "auto" | "video";
  tags?: string[];
}): Promise<UploadResult> {
  const client = getCloudinary();
  const {
    buffer,
    folder,
    filename,
    resourceType = "auto",
    tags = [],
  } = options;

  const result = await new Promise<{
    public_id: string;
    url: string;
    secure_url: string;
    format?: string;
    bytes?: number;
    width?: number;
    height?: number;
    resource_type: string;
  }>((resolve, reject) => {
    const stream = client.uploader.upload_stream(
      {
        folder: `consultvault/${folder}`,
        public_id: filename,
        resource_type: resourceType,
        tags: ["consultvault", ...tags],
        overwrite: false,
      },
      (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }
        resolve(uploadResult);
      },
    );
    stream.end(buffer);
  });

  return {
    publicId: result.public_id,
    url: result.url,
    secureUrl: result.secure_url,
    format: result.format,
    bytes: result.bytes,
    width: result.width,
    height: result.height,
    resourceType: result.resource_type,
  };
}

export async function deleteAsset(publicId: string, resourceType = "image") {
  const client = getCloudinary();
  return client.uploader.destroy(publicId, { resource_type: resourceType });
}

export function buildImageUrl(
  publicId: string,
  transforms?: Record<string, string | number | boolean>,
) {
  const client = getCloudinary();
  return client.url(publicId, {
    secure: true,
    ...transforms,
  });
}
