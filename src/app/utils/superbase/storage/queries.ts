"use server";
import { createClient } from "../server";

async function getBucket(bucketName: string) {
  const superbase = await createClient();
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
  const superbase = await createClient();
  if (!superbase) {
    console.log("failed to get superbase client");
    return false;
  }

  const { storage } = superbase;
  const { data, error } = await storage.getBucket(bucketName);

  if (error) {
    console.log("5555", error.message, data);
    return false;
  }

  return true;
}

async function createImageBucket(bucketName: string, isPublic: boolean) {
  const superbase = await createClient();
  if (!superbase) {
    console.log("failed to get superbase client");
    return null;
  }

  console.log(bucketName);

  const { data, error } = await superbase.storage.createBucket(bucketName, {
    public: isPublic,
    allowedMimeTypes: ["image/*"],
    fileSizeLimit: 2097152, //2mb
  });

  if (error) {
    console.log(error.name, error.cause, error.stack, error);
    console.log("failed to create bucket", error.message);
    return null;
  }

  return data.name;
}

async function uploadFile(file: File, bucketName: string, filePath: string) {
  //get current user
  const superbase = await createClient();
  if (!superbase) {
    console.log("failed to get superbase client");
    return null;
  }

  const authData = await superbase.auth.getUser();

  if (authData.error) {
    return null;
  }

  const { data, error } = await superbase.storage
    .from(bucketName)
    .upload(`${authData.data.user.id}/${filePath}`, file, { upsert: true });

  if (error) {
    console.log("Failed to Upload File");
    console.log(error.message, error);
    return null;
  }

  if (data === null) {
    return null;
  }

  const { fullPath, id, path } = data;
  return fullPath;
}

export { getBucket, createImageBucket, isBucketAvailable, uploadFile };
