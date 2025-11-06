import { generateRandomID } from "../utils.js";
import SampleMessage from "../SampleMessage.js";

const originTime = "2024-11-12T01:02:29Z";

const id = generateRandomID(24, true);
const taskID = generateRandomID(31, true);
const hitFaceImageId = null;
const faceImageId = `${generateRandomID(19, false)}@G42FP_1593399188`;
const hitTime = new Date(
  new Date().setMinutes(new Date(originTime).getMinutes())
).toISOString();
const lastModificationTime = hitTime;
const taskName = "SURVEILLANCE";
const deviceId = "635140f4cc30cd00093a43be";

export default [
  {
    id: generateRandomID(24, true),
    type: "yitu_behavior_event_DOG_composition_v1",
    eventTypeId: "d06947780ca84973b09c8493c51d81b5",
    hitTime: "2025-05-30T10:38:05Z",
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
    taskId: "d19db53673f44ce2bdd698a33930d22a",
    creationTime: "2025-05-30T10:38:05Z",
    lastModificationTime: "2025-05-30T10:08:05Z",
    attrs: {
      falseProposalStatus: "FALSE_DISPOSAL_AUDIT_NO_NEED",
      confirmation: {
        status: "TO_BE_CONFIRMED",
      },
      deviceId: "673c5a1f60bb1500090b2b63",
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
      sourceID: "x",
      sourceProduct: "HuaweiVMS",
      location: "+24.521296+54.675052/",
      deviceId: "a",
      cameraName: "MTB-L3-1793",
      areaPath:
        "/UAE/Abu Dhabi/Abu Dhabi City/Zayed Al Khair Boys School - C3/",
    },
  },
];
