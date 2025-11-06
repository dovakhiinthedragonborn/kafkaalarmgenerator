import { config } from "dotenv";

config();

export const DEFAULT_DEVICE_IDS = process.env.DEFAULT_DEVICE_IDS
  ? process.env.DEFAULT_DEVICE_IDS.split(",")
  : ["635140f4cc30cd00093a43be"];

export const DEFAULT_TASK_NAME = process.env.DEFAULT_TASK_NAMES
  ? process.env.DEFAULT_TASK_NAMES.split(",")
  : ["SURVEILLANCE"];

export const DEFAULT_SITE_NAMES = process.env.DEFAULT_SITE_NAMES
  ? process.env.DEFAULT_SITE_NAMES.split(",")
  : [
      "Mubadala Tower",
      "Abu Dhabi Mall",
      "Al Reem Mall",
      "Yas Island Mall",
      "Al Wadha Mall",
      "Yas Marina Circuit",
    ];

export const DEFAULT_HIT_FACE_IMAGE_URIs = process.env.HIT_FACE_IMAGE_URIs
  ? process.env.HIT_FACE_IMAGE_URIs.split(",")
  : [
      "kv://ytkv-surveillance-image/152/2022/10/26/13/55/8lsr5-584b9b6b-0603-4c8a-b815-23652dca43d4-1666778120735-515127970",
    ];

export const DEFAULT_FACE_IMAGE_URIS = process.env.FACE_IMAGE_URIs
  ? process.env.FACE_IMAGE_URIs.split(",")
  : [
      "kv://ytkv-image-flow-scene/119/2022/10/26/13/58006/zq7sl-423fee23-b1d5-42d4-b286-dfe18a10f299-1666778058073-514978488",
    ];

export const DEFAULT_SCENE_IMAGE_URIs = process.env.SCENE_IMAGE_URIs
  ? process.env.SCENE_IMAGE_URIs.split(",")
  : [
      "/image/v1/fusion/storage/eXRrdjEwMTkxOC1mdXNpb24vMDgyLzIwMjIvMTAvMjYvMTcvNTEvaGhycm0tM2YwYmU2YWQtMjQ4MS00MjZlLTkwMzctN2I1ZDQwMGE3M2RhLTE2NjY3Nzc4OTU4MTUtMTk4NTQ5MDk=",
    ];

export const DEFAULT_PRE_SCENE_IMAGE_URLs = process.env.PRE_SCENE_IMAGE_URLs
  ? process.env.PRE_SCENE_IMAGE_URLs.split(",")
  : [
      "/image/v1/fusion/storage/eXRrdjEwMTkxOC1mdXNpb24vMDgyLzIwMjIvMTAvMjYvMTcvNTEvaGhycm0tM2YwYmU2YWQtMjQ4MS00MjZlLTkwMzctN2I1ZDQwMGE3M2RhLTE2NjY3Nzc4OTU4MTUtMTk4NTQ5MDk=",
    ];

export const DEFAULT_POST_SCENE_IMAGE_URLs = process.env.POST_SCENE_IMAGE_URLs
  ? process.env.POST_SCENE_IMAGE_URLs.split(",")
  : [
      "/image/v1/fusion/storage/eXRrdjEwMTkxOC1mdXNpb24vMDgyLzIwMjIvMTAvMjYvMTcvNTEvaGhycm0tM2YwYmU2YWQtMjQ4MS00MjZlLTkwMzctN2I1ZDQwMGE3M2RhLTE2NjY3Nzc4OTU4MTUtMTk4NTQ5MDk=",
    ];

export const DEFAULT_LOCATIONS = process.env.DEFAULT_LOCATIONS
  ? process.env.DEFAULT_LOCATIONS.split(",")
  : ["+24.521296+54.675052/"];

  export const DEFAULT_CAMERA_SOURCE_IDS = process.env.DEFAULT_CAMERA_SOURCE_IDS
    ? process.env.DEFAULT_CAMERA_SOURCE_IDS.split(",")
    : ["10569617014264000"];
