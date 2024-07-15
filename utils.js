import { Kafka } from "kafkajs";
import { config } from "dotenv";

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

export const parseArguments = (argv) => {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const [key, value] = arg.substring(2).split("=");
      args[key] = value || false;
    }
  }
  return args;
};
