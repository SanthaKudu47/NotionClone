import { File } from "buffer";
import { createClient } from "../clients";

async function getBucket(bucketName: string) {
  const superbase = createClient();
  if (!superbase) {
    console.log("failed to get superbase client");
    return null;
  }

  const { storage } = superbase;
  const { data, error } = await storage.getBucket(bucketName);
  if (error) {
    console.log("Failed to Fetch from superbase", error.message);
    return null;
  }

  console.log(data);
  return data;
}

async function isBucketAvailable(bucketName: string) {
  const superbase = createClient();
  if (!superbase) {
    console.log("failed to get superbase client");
    return false;
  }

  const { storage } = superbase;
  const { data, error } = await storage.getBucket(bucketName);

  if (error) {
    return false;
  }

  return true;
}

async function createImageBucket(bucketName: string, isPublic: boolean) {
  const superbase = createClient();
  if (!superbase) {
    console.log("failed to get superbase client");
    return null;
  }

  const { data, error } = await superbase.storage.createBucket(bucketName, {
    public: isPublic,
    allowedMimeTypes: ["image/*"],
    fileSizeLimit: 1024,
  });

  if (error) {
    console.log("failed to create bucket", error.message);
    return null;
  }

  return data.name;
}

async function uploadFile(file: File) {
  const superbase = createClient();
  if (!superbase) {
    console.log("failed to get superbase client");
    return null;
  }
  //await superbase.storage.from()
}

export { getBucket, createImageBucket };
