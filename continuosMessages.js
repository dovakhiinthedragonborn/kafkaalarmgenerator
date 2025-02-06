import {
  generateRandomID,
  getArguementsForGenerateMessage,
  parseArguements,
  publishKafkaMessage,
  sleep,
} from "./utils.js";
import { config } from "dotenv";

const arguements = parseArguements(process.argv);
config();

const { taskNames, deviceIDs, locations } =
  getArguementsForGenerateMessage(arguements);

const messagesInBurst = parseInt(process.env.MESSAGES_IN_BURST) || 5;
const secondsPerBurst = parseInt(process.env.SECONDS_PER_BURST) || 10;

let key = 1;
while (true) {
  const messages = [];

  for (let index = 0; index < messagesInBurst; index++) {
    const id = generateRandomID(24, true);
    const taskId = generateRandomID(31, true);
    const hitFaceImageId = null;
    const faceImageId = `${generateRandomID(19, false)}@G42FP_1593399188`;
    const hitTime = new Date().toISOString();
    const lastModificationTime = hitTime;
    const taskName = taskNames.randomItem();
    const deviceId = deviceIDs.randomItem();
    const location = locations.randomItem();

    let newMessage = {
      id,
      type: taskName,
      eventTypeId: "d06947780ca84973b09c8493c51d81b5",
      hitTime,
      subjects: [
        {
          creationTime: hitTime,
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
            device: deviceId,
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
      taskId,
      creationTime: hitTime,
      lastModificationTime,
      attrs: {
        falseProposalStatus: "FALSE_DISPOSAL_AUDIT_NO_NEED",
        confirmation: {
          status: "TO_BE_CONFIRMED",
        },
        deviceId,
        sceneImageUrl:
          "/image/v1/fusion-audit/storage/eXRrdjEwMTkxOC1mdXNpb24tYXVkaXQvMDI3LzIwMjQvMTEvMTIvMTUvMjEvc21qcDItZmVkZGIzMTUtYmExYi00N2M2LTkwOGItNTUzOTFiZmVmMTAyLTE3MzEzOTYxMDQwMjgtMzE3OTE4Njk=",
        hitCategoryType: "MOTION_PATTERN_HIT",
        confirmTime: hitTime,
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
        sourceID: "00000024011007000301000000039005",
        sourceProduct: "HuaweiVMS",
        location,
        deviceId,
        cameraName: "M-GF-STAIR2_MZ-C126-IDF3-2068-AUH",
        areaPath:
          "/UAE/Abu Dhabi/Abu Dhabi City/Zayed Al Khair Boys School - C3/",
      },
    };

    // if (taskName === "SURVEILLANCE") newMessage = {};

    messages.push(newMessage);
  }

  await publishKafkaMessage(
    messages.map((x, i) => ({
      key: `key-${i + key * messagesInBurst}`,
      value: JSON.stringify(x),
      partition: i % 3,
    }))
  );

  console.log(`Published ${messages.length} message(s)`);

  await sleep(secondsPerBurst * 1000);
}
