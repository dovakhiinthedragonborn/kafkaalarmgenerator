import { Kafka } from "kafkajs";
import { config } from "dotenv";

config();

const TOPIC = process.env.TOPIC;
const BROKERS = process.env.BROKERS;

async function getTopicPartitions() {
  // Create a Kafka client
  const kafka = new Kafka({
    brokers: BROKERS.split(","),
    clientId: "kafka-client",
  });

  const admin = kafka.admin();

  try {
    // Connect to the admin client
    await admin.connect();

    // Specify the topic name
    const topicName = TOPIC; // Replace with your Kafka topic name

    // Fetch topic metadata
    const metadata = await admin.fetchTopicMetadata({ topics: [topicName] });

    // Extract the partition count
    const topicMetadata = metadata.topics.find(
      (topic) => topic.name === topicName
    );

    if (!topicMetadata) {
      console.log(`Topic "${topicName}" not found.`);
      return;
    }

    const partitionCount = topicMetadata.partitions.length;
    const topicOffsets = await admin.fetchTopicOffsets(topicName);
    console.log(`The topic "${topicName}" has ${partitionCount} partition(s).`);

    console.log(`Messages in each partition of topic "${topicName}":`);
    for (const partition of topicOffsets) {
      const partitionId = partition.partition;
      const highOffset = parseInt(partition.high, 10);
      const lowOffset = parseInt(partition.low, 10);

      const messageCount = highOffset - lowOffset;
      console.log(`Partition ${partitionId}: ${messageCount} messages`);
    }
  } catch (error) {
    console.error("Error fetching topic metadata:", error);
  } finally {
    // Disconnect the admin client
    await admin.disconnect();
  }
}

// Call the function
getTopicPartitions();
