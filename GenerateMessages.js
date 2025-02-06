import { config } from "dotenv";
import fs from "fs";
import SampleMessage from "./SampleMessage.js";
import {
  generateRandomID,
  getArguementsForGenerateMessage,
  getRandomItem,
  parseArguements,
  publishKafkaMessage,
} from "./utils.js";

config();

const generateAndPublishMessages = async () => {
  try {
    const arguements = parseArguements(process.argv);

    if (arguements.help || arguements.h)
      return console.log(`
      Usage: node .\\GenerateMessages.js [options]
      Options:
        -h, --help               Show help
        -c, --count              Number of messages to generate
        -m, --minutes            Minutes between each message
        -t, --taskNames          Task names separated by comma
        -s, --sites              Site names separated by comma
        -d, --deviceIDs          Device IDs separated by comma
        -o, --originHitTime      Origin hit time
        -u, --hitFaceImageUri    Hit Face Image URI
        -f, --faceImageUri       Face Image URI
        -d, --sceneImageUrl      Scene Image URL
        -b, --preSceneImageUrl   Pre Scene Image URL
        -a, --postSceneImageUrl  Post Scene Image URL
      `);

    const { count, minutes, taskNames, siteNames, deviceIDs, originTime } =
      getArguementsForGenerateMessage(arguements);

    console.log(siteNames);

    const messages = [];

    for (let index = 0; index < count; index++) {
      const id = generateRandomID(24, true);
      const taskID = generateRandomID(31, true);
      const hitFaceImageId = null;
      const faceImageId = `${generateRandomID(19, false)}@G42FP_1593399188`;
      const hitTime = new Date(
        new Date().setMinutes(
          new Date(originTime).getMinutes() + minutes * index
        )
      ).toISOString();
      const lastModificationTime = hitTime;
      const taskName = taskNames.randomItem();
      const deviceId = deviceIDs.randomItem();

      const newMessage = {
        id,
        type: taskName,
        eventTypeId: "d06947780ca84973b09c8493c51d81b5",
        hitTime,
        subjects: [
          {
            creationTime: "2024-11-12T01:02:29Z",
            track: {
              id: "default_676_1730893620743952_57607",
            },
            parts: {
              BODY: {
                model: "default",
                crop: {
                  rect: {
                    x: 550,
                    y: 78,
                    w: 168,
                    h: 424,
                  },
                },
              },
            },
            attrs: {
              device: "656080c6c23ca40009e45372",
              facePredictedAge: 0,
            },
            sceneImage: {
              perceivingArea: {
                x: 550,
                y: 78,
                w: 168,
                h: 424,
              },
            },
          },
        ],
        taskId: taskID,
        creationTime: hitTime,
        lastModificationTime: lastModificationTime,
        attrs: {
          falseProposalStatus: "FALSE_DISPOSAL_AUDIT_NO_NEED",
          confirmation: {
            status: "TO_BE_CONFIRMED",
          },
          deviceId: deviceId,
          sceneImageUrl:
            "/image/v1/fusion-audit/storage/eXRrdjEwMTkxOC1mdXNpb24tYXVkaXQvMDI3LzIwMjQvMTEvMTIvMTUvMjEvc21qcDItZmVkZGIzMTUtYmExYi00N2M2LTkwOGItNTUzOTFiZmVmMTAyLTE3MzEzOTYxMDQwMjgtMzE3OTE4Njk=",
          hitCategoryType: "MOTION_PATTERN_HIT",
          confirmTime: "2024-12-22T10:08:05Z",
          auditTimeTag: 810336949,
          preSceneImageUrl:
            "/image/v1/fusion-audit/storage/eXRrdjEwMTkxOC1mdXNpb24tYXVkaXQvMDA2LzIwMjQvMTEvMTIvMTUvMjEvc21qcDItZmVkZGIzMTUtYmExYi00N2M2LTkwOGItNTUzOTFiZmVmMTAyLTE3MzEzOTYxMDQxNjItMzE3OTIyNDY=",
          postSceneImageUrl:
            "/image/v1/fusion-audit/storage/eXRrdjEwMTkxOC1mdXNpb24tYXVkaXQvMDA2LzIwMjQvMTEvMTIvMTUvMjEvc21qcDItZmVkZGIzMTUtYmExYi00N2M2LTkwOGItNTUzOTFiZmVmMTAyLTE3MzEzOTYxMDQxNjItMzE3OTIyNDY=",
          remarks: "",
          source: "NORMAL",
          auditStatus: "CORRECT",
          properties: {},
        },
        cameraAttributes: {
          nvmsID: "fe932aea-a715-4021-a76b-6ae8505a5693",
          sourceID: "00000024011007000301000000040318",
          sourceProduct: "HuaweiVMS",
          location: "+24.521236+54.675943/",
          deviceId: deviceId,
          cameraName: "M-1F-LIFT2_LBY1-C266-IDF6-2068-AUH",
          areaPath:
            "/UAE/Abu Dhabi/Abu Dhabi City/Zayed Al Khair Boys School - C3/",
        },
      };

      messages.push(newMessage);
    }

    messages.sort((a, b) => new Date(b.hitTime) - new Date(a.hitTime));

    await publishKafkaMessage(
      messages.map((x, i) => ({ key: `${i}`, value: JSON.stringify(x) }))
    );

    messages.forEach((message, key) => {
      const currentTime = new Date().toISOString();
      if (key != messages.length - 1)
        fs.appendFileSync(
          "./logs/PublishedMessages.log",
          `[${currentTime}] ==> ${JSON.stringify(message)}\n`
        );
    });

    console.log(`Published ${messages.length} message(s)`);
  } catch (error) {
    const currentTime = new Date().toISOString();
    console.error(error);
    fs.appendFileSync(
      "./logs/Errors.log",
      `[${currentTime}] ==> ${error}\n`,
      "utf8"
    );
  }
};

await generateAndPublishMessages();
