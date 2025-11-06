import { config } from "dotenv";
import { Kafka } from "kafkajs";
import {
  DEFAULT_TASK_NAME,
  DEFAULT_DEVICE_IDS,
  DEFAULT_SITE_NAMES,
  DEFAULT_FACE_IMAGE_URIS,
  DEFAULT_LOCATIONS,
  DEFAULT_CAMERA_SOURCE_IDS,
} from "./Defaults.js";

config();

const TOPIC = process.env.TOPIC;
const BROKERS = process.env.BROKERS;

const kafka = new Kafka({
  brokers: BROKERS.split(","),
  clientId: "kafka-client",
});

// Description: Function to generate random ID
export const generateRandomID = (length = 24, allowAlphabets = true) => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const alphabets = ["a", "b", "c", "d", "e", "f"];
  let randomString = "";
  let validChars = allowAlphabets ? [...numbers, ...alphabets] : [...numbers];

  for (let index = 1; index <= length; index++)
    randomString += validChars[Math.floor(Math.random() * validChars.length)];

  return randomString;
};

export const publishKafkaMessage = async (messages) => {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: TOPIC,
    messages,
  });
  await producer.disconnect();
};

export const parseArguements = (argv) => {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const [key, value] = arg.substring(2).split("=");
      args[key] = value || true;
    }
    if (arg.startsWith("-")) {
      const [key, value] = arg.substring(1).split("=");
      args[key] = value || true;
    }
  }

  return args;
};

export const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

Array.prototype.randomItem = function () {
  const randomIndex = Math.floor(Math.random() * this.length);
  return this[randomIndex];
};

export const getArguementsForGenerateMessage = (arguements) => {
  const help = arguements.help || arguements.h;

  const count = parseInt(arguements.count ?? arguements.c) || 1;
  const minutes = parseInt(arguements.minutes ?? arguements.m) || 120;

  const taskNames = arguements.taskNames
    ? arguements.taskNames.split(",")
    : arguements.t
    ? arguements.t.split(",")
    : DEFAULT_TASK_NAME;

  const siteNames = arguements.sites
    ? arguements.sites.split(",")
    : arguements.s
    ? arguements.s.split(",")
    : DEFAULT_SITE_NAMES;

  const deviceIDs = arguements.deviceIDs
    ? arguements.deviceIDs.split(",")
    : arguements.d
    ? arguements.d.split(",")
    : DEFAULT_DEVICE_IDS;

  const locations = arguements.locations
    ? arguements.locations.split(",")
    : arguements.l
    ? arguements.l.split(",")
    : DEFAULT_LOCATIONS;

  const originTime = arguements.originHitTime
    ? new Date(arguements.originHitTime).toISOString()
    : arguements.o
    ? new Date(arguements.o).toISOString()
    : new Date().toISOString();

  const hitFaceImageId =
    arguements.hitFaceImageIDs || arguements.hf || DEFAULT_FACE_IMAGE_URIS;

  const cameraSourceIDs = arguements.cameraSourceIDs
    ? arguements.cameraSourceIDs.split(",")
    : DEFAULT_CAMERA_SOURCE_IDS;

  return {
    help,
    deviceIDs,
    taskNames,
    locations,
    siteNames,
    originTime,
    count: count > 0 ? count : 1,
    minutes: minutes > 0 ? minutes : 120,
    cameraSourceIDs,
  };
};

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
