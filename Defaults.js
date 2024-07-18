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
