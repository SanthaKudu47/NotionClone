"use server";

import { Workspaces } from "@/lib/superbase/db/scema.types";
import { createImageBucket, getBucket } from "./queries";
import { emit } from "process";

export type workspaceInitDataType = {
  title: string | null;
  emoji: File | null;
  workspaceLogo: File | null;
};

type KeyOfWorkspaceInitData = keyof workspaceInitDataType;
type ReturnDataType = {
  ok: boolean;
  message: string | null;
  data: any;
  validationErrors?: ValidationErrors;
};

type ValidationErrors = {
  title: string | null;
  logo: string | null;
  emoji: string | null;
};

async function createWorkspace(data: workspaceInitDataType) {
  const BUCKET_NAME = "workspace_meta";
  //validation
  const validationErrors: ValidationErrors = {
    title: null,
    logo: null,
    emoji: null,
  };
  const returnData: ReturnDataType = {
    ok: false,
    data: "",
    message: "",
  };
  let isAllFieldsNotNullOrUndefined = true;
  let isAllTypesValid = true;
  let isTitleValidated = true;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const indexKey: KeyOfWorkspaceInitData = key as KeyOfWorkspaceInitData;
      indexKey as KeyOfWorkspaceInitData;
      const element: string | File | null = data[indexKey];
      if (element === null || element === undefined) {
        isAllFieldsNotNullOrUndefined = false;
        if (key === "title") {
          validationErrors.title = "Please enter a valid title";
        }

        if (key === "emoji") {
          validationErrors.emoji = "Please select an emoji";
        }
        if (key === "workspaceLogo") {
          validationErrors.logo = "Please select an Logo image";
        }
      } else {
        if (key === "title" && data.title) {
          if (data.title.length < 4) {
            isTitleValidated = false;
            validationErrors.title =
              "Title needs to be at least 4 characters or more";
          }
        }
      }
    }
  }

  if (isAllFieldsNotNullOrUndefined && isTitleValidated) {
    //check type
    if (!(data.emoji instanceof File)) {
      isAllTypesValid = false;
    }

    if (!(data.workspaceLogo instanceof File)) {
      isAllTypesValid = false;
    }

    if (typeof data.title != "string") {
      isAllTypesValid = false;
    }
  } else {
    returnData.ok = false;
    returnData.message = "validation_error";
    returnData.validationErrors = validationErrors;
    return returnData;
  }

  if (!isAllTypesValid) {
    returnData.ok = false;
    returnData.message = "validation_error";
    returnData.validationErrors = validationErrors;
    return returnData;
  }

  //empty string check

  //ok to proceed

  //generate errors based on validation

  console.log(typeof data.emoji);

  console.log("Inside");
  console.log(data);
  return null;

  //validation
  //check for bucket
  //create new if not created yet
  //upload files //get urls
  //update table usingDrizzle
  const workspaceMetaBucket = await getBucket(BUCKET_NAME); //[{workspaceEmoji:[],}]
  if (!workspaceMetaBucket) {
    const bucketName = await createImageBucket(BUCKET_NAME, true);
    if (!bucketName) {
      console.log("Failed to Create Image Bucket");
      return null;
    }
  }
  //have a bucket
  //upload emoji

  // const res = super
}

export { createWorkspace };
