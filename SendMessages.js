import { config } from "dotenv";
import Messages from "./Data/Messages.js";
import {
  generateRandomID,
  getArguementsForGenerateMessage,
  getRandomItem,
  parseArguements,
  publishKafkaMessage,
} from "./utils.js";

config();

await publishKafkaMessage(
  Messages.map((message, key) => ({
    value: JSON.stringify(message),
  }))
);

//
