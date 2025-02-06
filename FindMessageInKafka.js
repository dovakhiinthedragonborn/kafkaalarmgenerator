import { config } from "dotenv";
import { Kafka } from "kafkajs";
import { parseArguements } from "./utils.js";

config();

const findMessages = async () => {
  let keys = null;
  let alarmIds = null;

  const arguements = parseArguements(process.argv);

  if (arguements.help || arguements.h)
    return console.log(`
    Usage: node .\\FindMessageInKafka.js.js [options]
    Options:
      -h, --help            Show help
      -k, --key             Kafka Message Key to search by
      -a, --alarmId         Alarm ID to search by
    `);

  if (arguements.key) keys = arguements.key.split(",");
  else if (arguements.k) keys = arguements.k.split(",");
  if (arguements.alarmId) alarmIds = arguements.alarmId.split(",");
  else if (arguements.a) alarmIds = arguements.a.split(",");
  const TOPIC = process.env.TOPIC;
  const BROKERS = process.env.BROKERS;

  const kafka = new Kafka({
    brokers: BROKERS.split(","),
    clientId: "kafka-client",
  });
  const consumer = kafka.consumer({
    groupId: "event-alert-for-psim_180823",
  });

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

    console.log("Done!");

    await consumer.disconnect();
  };

  run().catch(console.error);
};

await findMessages();
