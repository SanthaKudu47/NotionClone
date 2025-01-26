"use server";

import { Workspaces } from "@/lib/superbase/db/scema.types";
import {
  createImageBucket,
  getBucket,
  isBucketAvailable,
  uploadFile,
} from "./queries";
import { emit } from "process";
import { createWorkspaceForUser } from "@/lib/superbase/db/queries";
import { createClient } from "../server";

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

  const bucketAvailable = await isBucketAvailable(BUCKET_NAME);
  console.log("++++>", bucketAvailable);
  let bucketName: string | null = BUCKET_NAME;
  if (bucketAvailable === false) {
    bucketName = await createImageBucket(BUCKET_NAME, true);
  }

  if (bucketName === null) {
    returnData.ok = false;
    returnData.message = "Failed to create bucket on superbase!";
    return returnData;
  }

  //image bucket available

  if (!data.emoji) {
    returnData.ok = false;
    returnData.message = "Validation Error on emoji field";
    return returnData;
  }

  if (!data.workspaceLogo) {
    returnData.ok = false;
    returnData.message = "Validation Error on Logo field";
    return returnData;
  }

  const fullFilePathOfEmoji = await uploadFile(
    data.emoji,
    BUCKET_NAME,
    data.emoji.name
  );

  const fullFilePathOfLogo = await uploadFile(
    data.workspaceLogo,
    BUCKET_NAME,
    `workspace_logo${data.workspaceLogo.name.substring(
      data.workspaceLogo.name.lastIndexOf(".")
    )}`
  );

  if (!fullFilePathOfEmoji || !fullFilePathOfLogo) {
    returnData.ok = false;
    returnData.message = "Failed to upload file";
    return returnData;
  }

  //get urls and update database

  //

  const res = await createWorkspaceForUser(
    fullFilePathOfEmoji,
    fullFilePathOfLogo,
    data.title ? data.title : ""
  );

  returnData.ok = true;
  returnData.data = { emoji: fullFilePathOfEmoji, logo: fullFilePathOfLogo };
  returnData.message = "Successfully file uploaded";
  return returnData;
}

export { createWorkspace };
