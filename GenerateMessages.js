import SampleMessage from "./SampleMessage.js";
import fs from "fs";
import {
  generateRandomID,
  publishKafkaMessage,
  parseArguments,
} from "./utils.js";

const arguements = parseArguments(process.argv);

const count = parseInt(arguements.count) || 1;
const minutes = parseInt(arguements.minutes) || 120;
const taskName = arguements.taskName || "SURVEILLANCE";
const siteNames = arguements.sites
  ? arguements.sites.split(",")
  : [
      "Al Reem Mall",
      "Mubadala Tower",
      "Abu Dhabi Mall",
      "Yas Island Mall",
      "Al Wadha Mall",
      "Yas Marina Circuit",
    ];

const messages = [];
const originTime = new Date().toISOString();

for (let index = 0; index <= count; index++) {
  const id = generateRandomID(24, true);
  const taskID = generateRandomID(31, true);

  const hitFaceImageId = null;

  const faceImageId = `${generateRandomID(19, false)}@G42FP_1593399188`;

  const hitTime = new Date(
    new Date().setMinutes(new Date(originTime).getMinutes() + minutes * index)
  ).toISOString();

  const lastModificationTime = hitTime;

  const newMessage = {
    id,
    taskID,
    taskName,
    hitTime,
    siteName: siteNames[Math.floor(Math.random() * siteNames.length)],
    lastModificationTime,
    deviceId: SampleMessage.deviceId,
    location: SampleMessage.location,
    raw: JSON.stringify({
      id,
      type: taskName,
      hitTime,
      taskId: taskID,
      creationTime: hitTime,
      lastModificationTime,
      attrs: {
        hitRecordId: generateRandomID(19, false),
        fpHost: SampleMessage.raw.attrs.fpHost,
        confirmation: { status: "CORRECT" },
        deviceId: SampleMessage.raw.attrs.deviceId,
        sceneImageUrl: SampleMessage.raw.attrs.sceneImageUrl,
        hitCategoryType: SampleMessage.raw.attrs.hitCategoryType,
        auditStatus: SampleMessage.raw.attrs.auditStatus,
        surveillanceContent: {
          is_rule2: false,
          rec_age_range: 1,
          face_image_cluster_id:
            SampleMessage.raw.attrs.surveillanceContent.face_image_cluster_id,
          is_rule1: false,
          picture_uri: SampleMessage.raw.attrs.surveillanceContent.picture_uri,
          is_rule4: false,
          is_rule3: true,
          force_input: true,
          hit_face_image_uri:
            SampleMessage.raw.attrs.surveillanceContent.hit_face_image_uri,
          rec_hat_color: -1,
          key_frame_id: 0,
          hit_gender: 0,
          merged_track_id: "",
          audit_status: "TO_BE_CONFIRMED",
          hit_record_id_str:
            SampleMessage.raw.attrs.surveillanceContent.hit_record_id_str,
          track_type: 0,
          raw_face_rect:
            SampleMessage.raw.attrs.surveillanceContent.raw_face_rect,
          detected_rect_type: 0,
          global_picture_uri:
            SampleMessage.raw.attrs.surveillanceContent.global_picture_uri,
          hit_global_face_image_uri:
            SampleMessage.raw.attrs.surveillanceContent
              .hit_global_face_image_uri,
          rec_age_predicted: 27,
          rec_hat: 0,
          picture_md5: SampleMessage.raw.attrs.surveillanceContent.picture_md5,
          rec_is_calling: 0,
          track_status: 2,
          id: -9079256848778512943,
          hit_global_picture_uri:
            SampleMessage.raw.attrs.surveillanceContent.hit_global_picture_uri,
          device_id: SampleMessage.raw.attrs.surveillanceContent.device_id,
          frames: [],
          rec_smiley_face: 0,
          hit_timestamp: 1627318253,
          rec_glasses: 0,
          rec_beard_style: -1,
          quality: 62.22508239746094,
          face_angle: {
            x: 11.130640983581545,
            y: 8.759671211242676,
            z: -5.436430931091309,
          },
          is_red_name: false,
          picture_cluster_id: "G42FP_1593399188",
          is_set_face_data: true,
          additional_info: {
            last_frame: {
              pedestrian_rect: { w: 300, h: 792, x: 1618, y: 56 },
              face_rect: { w: 85, h: 85, x: 1736, y: 108 },
              frame_id: 3908286,
              timestamp: 1666777989.81892,
            },
            first_frame: {
              pedestrian_rect: { w: 104, h: 260, x: 736, y: 8 },
              face_rect: { w: 39, h: 42, x: 771, y: 30 },
              frame_id: 3908225,
              timestamp: 1666777977.6367888,
            },
          },
          local_track_id: 8228,
          yitu_131020600_feature_base64:
            "FZ6U/dEa0/mNlg70RBJN/weOhe3ACsHpf4YT9jIEzOjVqIfJtdpe3rqOFNUv8dou8WiMN1IeVDZQudzPBAU2O92ho61p1Wy4ZYk6ah8l97fHuKNTiedqo9NDuIAFPPKvvDPDnHa5cYkDOqZtHrIZn7MhIJB1Q5iIHtFzeNCjBYee4RqMUWlRjgQVc3/JfDtjlfURabqFt5b18IKXsmNBfIkCDKbGZ8mpFfdmrrtyV7eM8Py7JZgnSSIfVKmbZ5e9qTUuPhO7EtDPPLTenlmDIanKO9f4WgQjVMXfLIJNcirbu5EYB8bjFlSx1+mBw4DtNFlfBhnaEgibXeD6qCZN8QRhYfbQESgOfmH2CbcEsgz9fZDlLP0p83SJ/eE0Ajng93J12rz6sN5vdu3UJPIr0+duZcyj5aHPUGbdxBrqGcDXblW8lq2RuEzFzbQNqAmwwM5FrIfMgag5+L2k+Yr5oLdeNZx3q3GYKN2tlOsa6ZCldSWMZe5hiB+wnYTb6dmAlvIVfFO0UXgJlY10zuDJcIXnBWxD6kFo/uh9ZLzuuWB2vfVcNQkxWOqwbVSutalQZq7lTCE8IUjbel1En4mZQFCn1TwVcRE4zKJNNIh4iTBHtsUsASYBKLwZPSR8WHkgNi61HPQW8Riv3y0UbjppECIapQzgAOEInJodBFlTWQAWeZ382xrR+I+eDf1LEknwD46P6ww9+eR/jfvkOgI05vd8dbqw+rLeaXbp1CvxKdXibm3Mr+qhyEti3clb0nNDe15VvJM=",
          face_image_id: faceImageId,
          track_id: "default_14050_1665997200564357_8228",
          hit_born_year: 0,
          face_image_id_str: faceImageId,
          is_low_quality: false,
          face_rect_type: 0,
          hit_face_image_cluster_id: "G42FP_1593399188",
          hit_repository_id: "35@G42FP_1593399188",
          timestamp_begin: 0,
          origin_face_image_uri:
            "kv://ytkv-image-flow-scene/105/2022/10/26/13/58006/8lsr5-584b9b6b-0603-4c8a-b815-23652dca43d4-1666778118071-515127923",
          rec_mask: 0,
          last_frame_id: 0,
          associate_identity: {},
          first_frame_id: 0,
          rec_beard: 0,
          hit_origin_face_image_uri:
            "kv://ytkv-repository-builder-35/109/2021/07/27/00/55/qqbmt-676d8711-3846-4e1b-aef4-260c5d20fa37-1627318530640-596036750",
          frame_meta: {
            frame_resized_height: 1080,
            frame_width: 1920,
            frame_height: 1080,
            frame_resized_width: 1920,
          },
          monitor_push_timestamp: 1666777699.335105,
          rec_fs_color: -1,
          key_frame_id_str: "0",
          hit_person_id: "",
          is_hit: true,
          hit_nation: 0,
          cluster_id: "G42FP_1593399188",
          hit_face_image_id: hitFaceImageId,
          intelligence_judgement: { same_hit: 1, retrieval_id: 429776 },
          hit_permission_map: {},
          is_fake: false,
          timestamp_end: 0,
          timestamp: 1666777989,
          annotation: 0,
          rec_hairstyle: 1,
          hit_face_image_id_str: hitFaceImageId,
          algorithm_model: "face_video_face_and_body",
          hit_similarity: 99.33606466050398,
          camera_id: "58006@G42FP_1593399188",
          rec_sunglass: 0,
          hit_is_writable: true,
          analysis_task_id:
            "legacy-face-video-face-and-body-hd-low62a62b32b2afb1000978a045",
          face_rect: { w: 85, h: 85, x: 1736, y: 108 },
          rec_gender: 1,
          hit_picture_uri:
            "kv://ytkv-repository-builder/054/2021/07/27/00/53/b7hkz-6aa89406-7147-410d-9b26-58bc69372f35-1627318395483-596540364",
          track_finished: true,
          origin_face_image_id: "9367487224931038673@IPIC_1649755861",
          surveillance_id: 67,
          face_image_uri:
            "kv://ytkv-surveillance-image/120/2022/10/26/13/55/8lsr5-584b9b6b-0603-4c8a-b815-23652dca43d4-1666778118444-515127938",
          hit_rec_feature_base64: {
            yitu_131020600:
              "FZ6U/dEa0/mNlg70RBJN/weOhe3ACsHpf3IqwcIFwMXUiIbTquK2xrKPHS/NCsYkHm6D27gOUc6ykd3QAhYzyMBKo6uB3GhUWr3MWfci8kzGsbWsfO5grOJlsrUHOfOgtMEkYWpBdog0MVqRGqoHloIoJYNiSp9zEyJth8mqPJiDEuySVmK/jwkTe3zLbzJ9lQwWgUKIs5zl65SLTm9IeInwCq3AZMyw4v1trKd2UqJu6em+3oYoRNziTLmPZptGXy7RLeC9FMs2O07PmkqYPb/Twyr+Q+gquDjG03FBbDHGrrkdDDDxGa+92uqfwoASBlNYAhTXEAiWoun7piZeBQSSluYgHC0BeG74DrgeuffrepPnM+Ut52mJ/eE0Ajng93J12rz6sN5vdu3UJPIr0+duZcyj5aHPUGbdxBrqGcDXblW8lQuRuElkzbQMtgmwwotFrIelgag8X72k/B75oLXZNZx0G3GYLQ2tlOsa6ZCiPSWMYLRhiBwmnYTYg9mAljYVfFC7UXgO/o10ylLJcIO2BWxEJEFo/uh9ZL9euWB18vVcNQkxWOjPbVSutalQYx/lTCEoIUjeJ11EmmKZQFb81TwVcRE4zM1NNIwniTBDcsUsATYBKLkgPSR7T3kgNi61HPQW8RitEi0UbjppECG5pQzgZOEInH0dBFjxWQAQGJ382xrR+I+eDf1LEknwD46P6ww9+eR/jfvkOgI05vd8dbqw+rLeaXbp1CvxKdXmbm3Mr+qhyF5m",
            yitu_130720300:
              "FZ6U/dEa0/mNlg70RBJN/weOhe3ACsHpf2Ek+cUCwMDvhJnIq/O5xbKDMCDIH8YlHm+J0rYDRMOwlN/VChswwMNerKaY3WlTVqLJX/Aj+049TL2qg+9fVdtktaMILv+oSzk6ZGVMYZUPJl6R4aIPgIApJ5dqT2d2DiNvcs+1M4+CFu6bpWeklwYacHHIZDN5kwQRgkCMv5vs7ZWJuG1bQI/18K3DazG/5whvoKB3UaFi6u23JockR9saSLyOnGRPXikpK+2478A+Lk02hEaTzbTSyNMFRunWsznF2HZAZCrDuLka8zrxGlK/2RCa2owbKaJZCuLXFwuSr+8AtSBaDhSbbuwqHD/8fmTi9KQbuQz1jJHswPM65mqJ/eE0Ajng93J12rz6sN5vdu3UJPIr0+duZcyj5aHPUGbdxBrqGcDXblW8k3ORuEmezbQN0AmwwdZFrIHbgag6l72k+RT5oLcONZx0u3GYL+2tlOnE6ZCm4CWMY8FhiB3GnYTeG9mAl5oVfFEnUXgOso10ySzJcIfIBWxHgEFo/5h9ZLoPuWB1A/VcNpkxWO3BbVSpSalQYF/lTCAuIUjeFV1EnIiZQFXd1TwT+RE4zTVNNI73iTBFc8UsABYBKLv7PSR5pnkgNyS1HPWY8Rir7i0UayFpECRypQzn0eEImwMdBF5PWQAUXZ382xrR+I+eDf1LEknwD46P6wmo7eR/jfvkOgI05vd8dZSw+rLbaXbp1CvxKdXmbm3Mr+qhyF9m",
          },
          is_set_pedestrian_data: false,
          hit_picture_cluster_id: "G42FP_1593399188",
          hit_name: "yutong",
          global_face_image_uri:
            "/storage/v1/image?cluster_id=G42FP_1593399188&uri_base64=a3Y6Ly95dGt2LXN1cnZlaWxsYW5jZS1pbWFnZS8xMjAvMjAyMi8xMC8yNi8xMy81NS84bHNyNS01ODRiOWI2Yi0wNjAzLTRjOGEtYjgxNS0yMzY1MmRjYTQzZDQtMTY2Njc3ODExODQ0NC01MTUxMjc5Mzg=",
        },
      },
    }),
  };

  messages.push(newMessage);
}

messages.sort((a, b) => new Date(b.hitTime) - new Date(a.hitTime));

await publishKafkaMessage(messages.map((x) => ({ value: JSON.stringify(x) })));

messages.forEach((message) => {
  fs.appendFileSync(
    `./GeneratedMessages.txt`,
    `echo '${JSON.stringify(
      message
    )}' | kafkacat -b 10.144.36.181:9092,10.144.36.132:9092,10.144.36.125:9092 -t event-alert-for-psim_from_mysql -P \n`
  );
});
