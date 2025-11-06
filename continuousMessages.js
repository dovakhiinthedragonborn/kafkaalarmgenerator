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

const { taskNames, deviceIDs, locations, cameraSourceIDs } =
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
    const cameraSourceId = cameraSourceIDs.randomItem() || "10569617014264000";

    let newMessage = {
      id: "680b605e62e1dc00072e3bdf",
      type: "SURVEILLANCE",
      hitTime,
      taskId: "2",
      creationTime: hitTime,
      lastModificationTime: hitTime,
      attrs: {
        hitRecordId: "1742462387657698134",
        fpHost: "10.244.203.23",
        confirmation: { status: "CORRECT" },
        deviceId: "67d1394e7e54d1000700742b",
        sceneImageUrl:
          "/image/v1/fusion/storage/a3YtZnVzaW9uLzRlZWI2ODBiNjA1ZDAwMDAwNTAwMDExMDg4NzNfMTc0MDQ3OTI5Ni1hMDMxMzFkZi1iZGRiLTQ4ZWMtYTA4Ny1jYTBjNjU4ZjM3MDU=",
        hitCategoryType: "SCENE_HIT",
        confirmTime: "2025-04-25T10:13:50Z",
        auditTimeTag: -200960,
        auditStatus: "TO_BE_CONFIRMED",
        surveillanceContent: {
          is_rule2: false,
          rec_age_range: 1,
          is_rule1: false,
          is_body_low_quality: false,
          is_rule4: false,
          is_rule3: true,
          force_input: true,
          international_code: "",
          hit_face_image_uri:
            "kv://kv-surveillance_image/4eeb680b608300000100067215ad_1739965986-fcd7b4bd-2b9e-4b82-b69d-f67099d7465a",
          audit_status: "TO_BE_CONFIRMED",
          hit_record_id_str: "1742462387657698134",
          detected_rect_type: 0,
          global_picture_uri:
            "/storage/v1/image?cluster_id=auhpoc_1740041949&uri_base64=a3Y6Ly9rdi1pbWFnZS1mbG93X3NjZW5lLzRlZWI2ODBiNjA4MzAwMDAwMTAwMDI3MjE1OTNfMTczOTk2NTk4Ni1mY2Q3YjRiZC0yYjllLTRiODItYjY5ZC1mNjcwOTlkNzQ2NWE=",
          rec_age_predicted: 27,
          rec_hat: 0,
          id: -9079256848761479647,
          device_id: "67d1394e7e54d1000700742b",
          frames: [],
          hit_timestamp: 1742545874,
          rec_glasses: 0,
          quality: 4.388306209375163,
          picture_cluster_id: "auhpoc_1740041949",
          additional_info: {
            last_frame: {
              pedestrian_rect: { w: 128, h: 322, x: 1179, y: 248 },
              frame_id: 3225870,
              timestamp: 1.745576231355641e9,
            },
            first_frame: {
              pedestrian_rect: { w: 116, h: 294, x: 594, y: 172 },
              face_rect: { w: 47, h: 40, x: 630, y: 194 },
              frame_id: 3225859,
              timestamp: 1.745576226793886e9,
            },
          },
          local_track_id: 650358,
          face_image_id: "9367487224985562773@auhpoc_1740041949",
          track_id: "default_3_1744364635911195_650358",
          is_low_quality: false,
          rec_mask: 0,
          last_frame_id: 0,
          associate_identity: {},
          first_frame_id: 0,
          hit_origin_face_image_uri:
            "kv://kv-unique_bucket___repository_builder_5/4ec867dd23d20000010000d17c13_1739965986-fcd7b4bd-2b9e-4b82-b69d-f67099d7465a",
          frame_meta: {
            frame_resized_height: 1080,
            frame_width: 3840,
            frame_height: 2160,
            frame_resized_width: 1920,
          },
          monitor_push_timestamp: 1.745576067755852e9,
          rec_fs_color: 3,
          key_frame_id_str: "0",
          hit_person_id: "00006",
          rec_upperbody_style: 1,
          is_hit: true,
          rec_direction: 4,
          intelligence_judgement: { same_hit: 1, retrieval_id: 156 },
          is_fake: false,
          timestamp: 1745576231,
          annotation: 0,
          algorithm_model: "face_video_face_and_body",
          hit_similarity: 99.60757202827058,
          rec_sunglass: 0,
          hit_picture_uri:
            "kv://kv-unique_bucket___repository_builder_5/4ec867dd23d20000010001d17c12_1739965986-fcd7b4bd-2b9e-4b82-b69d-f67099d7465a",
          track_finished: true,
          origin_face_image_id: "9367487224948071969@auhcell_1741252925",
          rec_baby_in_arms: 0,
          surveillance_id: 2,
          pedestrian_image_uri:
            "kv://kv-image-flow_scene/4eeb680b60830000010004721591_1739965986-fcd7b4bd-2b9e-4b82-b69d-f67099d7465a",
          is_set_pedestrian_data: true,
          hit_picture_cluster_id: "auhpoc_1740041949",
          face_image_cluster_id: "auhpoc_1740041949",
          picture_uri:
            "kv://kv-image-flow_scene/4eeb680b60830000010002721593_1739965986-fcd7b4bd-2b9e-4b82-b69d-f67099d7465a",
          rec_hat_color: -1,
          key_frame_id: 0,
          merged_track_id: "",
          track_type: 0,
          hit_global_face_image_uri:
            "/storage/v1/image?cluster_id=auhpoc_1740041949&uri_base64=a3Y6Ly9rdi1zdXJ2ZWlsbGFuY2VfaW1hZ2UvNGVlYjY4MGI2MDgzMDAwMDAxMDAwNjcyMTVhZF8xNzM5OTY1OTg2LWZjZDdiNGJkLTJiOWUtNGI4Mi1iNjlkLWY2NzA5OWQ3NDY1YQ==",
          mode: 3,
          pedestrian_rect: { w: 128, h: 322, x: 1179, y: 248 },
          picture_md5: "d41d8cd98f00b204e9800998ecf8427e",
          rec_is_calling: 0,
          track_status: 2,
          hit_global_picture_uri:
            "/storage/v1/image?cluster_id=auhpoc_1740041949&uri_base64=a3Y6Ly9rdi11bmlxdWVfYnVja2V0X19fcmVwb3NpdG9yeV9idWlsZGVyXzUvNGVjODY3ZGQyM2QyMDAwMDAxMDAwMWQxN2MxMl8xNzM5OTY1OTg2LWZjZDdiNGJkLTJiOWUtNGI4Mi1iNjlkLWY2NzA5OWQ3NDY1YQ==",
          raw_head_rect: { w: 116, h: 122, x: 2440, y: 492 },
          rec_smiley_face: 0,
          rec_beard_style: 1,
          face_angle: {
            x: 7.034224987030029,
            y: 9.922338485717773,
            z: -0.8384264707565308,
          },
          is_red_name: false,
          is_set_face_data: true,
          yitu_131020600_feature_base64:
            "FZ6U/dEa0/mNlg70RBJN/weOhe3ACsHpf3QczzvqOw33ZpEioA5Pz42J+cMn8iHTHG6CMrDlTsNYZsTBF//hOzpTRECQLIq5vKbdU/fED1wwp1x3oMWBWjW8S6PpPvF3T801j2Ome23Ly1CbH1wMb1D0JHCTspaGFi2dcDymIIOTHxVoUJqglfT0iW03YdmPgQfyYriPpYUN7XhsT4O0alMaHVcrgz1WzwCLXa9WvL2ZE+ShImgja9MWqUZmZYpQUjbaPBi0CznExrDLjKFjKakyw9fgvQ08S9LALHK+ej44uEbv8D8WHri+x+5vOZXrMVeiDRUkDwJhrucKStyi7eyVaA0o9NwLcoQOC7ATSufwfIQWMf437naJ/eE0Ajng93J12rz6sN5vdu3UJPIr0+duZcyj5aHPUGbdxBrqGcDXblW8lGmRuExozbQO0gmww9VFrIQQgag/u72k+Af5oLNjNZxyJnGYKcqtlOoY6ZCjiCWMY9VhiB78nYTYJ9mAlcMVfFPQUXgM9410zsXJcIf7BWxEbUFo//R9ZLiauWB15/VcMJ8xWOp/bVSt+qlQZ6PlTCYFIUjfGl1EnDCZQFd71TwSEhE4zw5NNIyxiTBBQcUsAx4BKLlrPSR4NnkgMvG1HPYb8RioSC0UapVpECe6pQzngeEInpYdBFkFWQAWv5382xrR+I+eDf1LEknwD46P6ww9+eR/jfvkOgI05vd8dbqw+rLeaXbp1CvxKdXibm3Mr+qhyEtm",
          face_image_id_str: "9367487224985562773@auhpoc_1740041949",
          face_rect_type: 1,
          rec_lowerbody_color: 1,
          hit_face_image_cluster_id: "auhpoc_1740041949",
          hit_repository_id: "5@auhpoc_1740041949",
          timestamp_begin: 0,
          origin_face_image_uri:
            "kv://kv-image-flow_face/4eeb680b6083000001000172158b_1739965986-fcd7b4bd-2b9e-4b82-b69d-f67099d7465a",
          rec_beard: 1,
          cluster_id: "auhpoc_1740041949",
          hit_face_image_id: "9223372036854795814@auhpoc_1740041949",
          hit_permission_map: {
            551: 2,
            310: 1,
            552: 2,
            311: 1,
            553: 2,
            312: 1,
            510: 2,
            554: 2,
            313: 1,
            512: 2,
            0: 2,
            1: 2,
            200: 2,
            201: 2,
            520: 2,
            202: 2,
            400: 2,
            521: 2,
            203: 2,
            401: 2,
            522: 2,
            204: 2,
            402: 2,
            523: 2,
            205: 2,
            524: 2,
            601: 2,
            206: 2,
            525: 2,
            602: 2,
            800: 2,
            207: 2,
            526: 2,
            603: 2,
            208: 2,
            527: 2,
            604: 2,
            209: 2,
            528: 2,
            605: 2,
            450: 2,
            210: 2,
            452: 2,
            211: 2,
            453: 2,
            212: 2,
            213: 2,
            214: 2,
            215: 2,
            100: 2,
            101: 2,
            102: 2,
            300: 2,
            301: 2,
            302: 2,
            303: 2,
            501: 2,
            304: 2,
            502: 2,
            503: 2,
            504: 2,
            505: 2,
          },
          rec_upperbody_color: 0,
          timestamp_end: 0,
          rec_hairstyle: 1,
          hit_face_image_id_str: "9223372036854795814@auhpoc_1740041949",
          camera_id: "181@auhpoc_1740041949",
          monitor_accept_timestamp: 1.7455762349804418e9,
          hit_is_writable: true,
          analysis_task_id:
            "legacy-face-video-face-and-body-hd-low67d1394e7e54d1000700742b",
          face_rect: { w: 58, h: 61, x: 1220, y: 246 },
          rec_gender: 1,
          rec_lowerbody_style: 0,
          body_quality: 4.388306209375163,
          face_image_uri:
            "kv://kv-surveillance_image/4eeb680b608300000100057215aa_1739965986-fcd7b4bd-2b9e-4b82-b69d-f67099d7465a",
          hit_rec_feature_base64: {
            yitu_131020600:
              "FZ6U/dEa0/mNlg70RBJN/weOhe3ACsHpf20s8sTv0RcLWJg2uh5A17l0/vbQADLWDG6KyK/gSTVfRSLHE/EYPwNQeU2E05xWu6bLW/XA87Auv1FAlsZ3VTCtuaT8LQdCQM84u3+4fmPDEq+F6UccaVLALWaOoJ6UDiKWcyOi2YOT4hV7r2NUjObudlbCZcVwhgr0kbyIsYAN6HdtSIisaWQUAFE4iTdK+w2dVa9WuqGb6/S5IWAsVswJq7+TbIpBUCrWzgqjCMPe0Ekgdat/JLHEzdjUuQIlTMrD1Gu8ezY/RLXrCy0SEaFIwhJuI4DrKVSmCeclFPacrx0RT921/OeRlArQ4NECjIX2CaDkSev0ZoARK/I26HiJ/eE0Ajng93J12rz6sN5vdu3UJPIr0+duZcyj5aHPUGbdxBrqGcDXblW8lG6RuExozbQJeAmww9VFrILfgag8n72k/W75oLdwNZxyJnGYKnatlOoY6ZCluSWMY9VhiB78nYTYJ9mAlCUVfFecUXgLTI10zsXJcIf7BWxAPkFo/9J9ZLn7uWB15/VcMJ8xWO2rbVSuxalQYJPlTCSyIUjfGl1Emw2ZQFPi1TwUTRE4ytVNNIrziTBAHcUsBv8BKL4FPSR44XkgNku1HPdf8Rir0i0UaoNpECIfpQzngeEInvAdBFkFWQAQbp382xrR+I+eDf1LEknwD46P6ww9+eR/jfvkOgI05vd8dbqw+rLeaXbp1CvxKdXmbm3Mr+qhyF9m",
          },
          yitupedes_1002540_feature_base64:
            "FZ6U/dEa0/mNlg70RBJN/weOhe3ACsHpf4/6/DcrBdjji5PeuQpSzLCZ/ygvCSvW8H1XAqAcoTe9c9/Q7RcE0+RAc7yAPWq2W63uVwomLqXDU1BVZciCVMVkrqnyMvegpSzKaYxNnnU401mW4ajpaLY+LoOSp2F07iKdft+u2H5r+uCBUJRPatEWcXnoms12hg8XbEBytmL1D4t0vX+YYYIS8aXGfTpC7fdkr4eYrlJi5x6y0W4httrkX1abnGxAVyXQy/1UE8bCP0nHi1eCy03PxNcGTwE9tsjG3Y5Qdygzvrfi9ccHGFFNLxBpw5wQ2aSiDOQsH/6YsOoJXyKg+uxkl/sqGNL4g20FCr0Usgv5ioTsPgw47IqJ/eE0Ajng93J12rz6sN5vdu3UJPIr0+duZcyj5aHPUGbdxBvqGcjXXlW8m9qYuE9WzbwL2Am/i2JF",
          hit_name: "Joe Mascarenhas",
          global_face_image_uri:
            "/storage/v1/image?cluster_id=auhpoc_1740041949&uri_base64=a3Y6Ly9rdi1zdXJ2ZWlsbGFuY2VfaW1hZ2UvNGVlYjY4MGI2MDgzMDAwMDAxMDAwNTcyMTVhYV8xNzM5OTY1OTg2LWZjZDdiNGJkLTJiOWUtNGI4Mi1iNjlkLWY2NzA5OWQ3NDY1YQ==",
        },
        properties: {},
      },
      cameraAttributes: {
        deviceId: "67d1394e7e54d1000700742b",
        nvmsID: "4c45a202-aa44-42ba-802c-f78e51ba2393",
        sourceProduct: "NVMS",
        areaPath: "/UAE/Abu Dhabi/Abu Dhabi City/AUH_AICell/",
        location: "+24.4518033+54.6406063/",
        cameraName: "MTB-L3-1937",
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
