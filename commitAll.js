import { config } from "dotenv";
import { Kafka } from "kafkajs";

// Initialize Kafka client

config();

const TOPIC = process.env.TOPIC;
const BROKERS = process.env.BROKERS;

// Kafka configuration

const kafka = new Kafka({
  clientId: "kafka-client",
  brokers: BROKERS.split(","), // Replace with your Kafka broker(s)
});
// Consumer configuration
const consumer = kafka.consumer({
  groupId: "event-alert-for-psim-cg",
});

const run = async () => {
  // Connect to Kafka
  await consumer.connect();

  // Subscribe to the topic
  await consumer.subscribe({ topic: TOPIC, fromBeginning: false });

  // Start consuming messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        // Process the message
        console.log({
          topic,
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

        // Manually commit the offset for this message
        await consumer.commitOffsets([
          {
            topic,
            partition,
            offset: (parseInt(message.offset, 10) + 1).toString(),
          },
        ]);

        console.log(`Offset ${message.offset} committed.`);
      } catch (error) {
        console.error("Error processing message:", error);
      }
    },
  });
};

// Handle shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await consumer.disconnect();
  process.exit(0);
});

// Start the consumer
run().catch(console.error);
