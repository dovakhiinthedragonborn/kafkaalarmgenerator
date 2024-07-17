import { Kafka } from "kafkajs";
import { config } from "dotenv";
import { parseArguments } from "./utils.js";

config();

let keys = null;
let alarmIds = null;

const arguements = parseArguments(process.argv);

if (arguements.key) keys = arguements.key.split(",");
if (arguements.alarmId) alarmIds = arguements.alarmId.split(",");

const TOPIC = process.env.TOPIC;
const BROKERS = process.env.BROKERS;

const kafka = new Kafka({
  brokers: BROKERS.split(","),
  clientId: "kafka-client",
});
const consumer = kafka.consumer({ groupId: "TEST__psimmysqltopicgroup__TEST" });

const run = async () => {
  // Connecting the consumer
  await consumer.connect();

  // Subscribing to the topic
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

  // Running the consumer to read messages
  await consumer.run({
    eachMessage: async ({ partition, message }) => {
      if (keys && keys.includes(message.key))
        console.log("Message Found by key!: ", {
          key: message.key,
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

      if (alarmIds) {
        const alarm = JSON.parse(message.value);
        if (alarmIds.includes(alarm?.id))
          console.log("Message Found by alarm ID!: ", {
            alarmId: alarm.id,
            partition,
            offset: message.offset,
            value: message.value.toString(),
          });
      }
    },
  });
};

run().catch(console.error);
