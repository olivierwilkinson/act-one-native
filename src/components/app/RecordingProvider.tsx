// import React, { useState, useEffect, ReactNode, useContext } from "react";
// import { Audio } from "expo-av";
// import { Alert, Linking, AsyncStorage } from "react-native";
// import { AUDIO_RECORDING, PermissionMap } from "expo-permissions";

// import Recording from "../../contexts/Recording";
// import Permissions from "../../contexts/Permissions";

// type Props = {
//   children: ReactNode;
// };

// const record = async (
//   onStatusUpdate: (status: Audio.RecordingStatus) => void
// ) => {
//   const recording = new Audio.Recording();
//   recording.setOnRecordingStatusUpdate(onStatusUpdate);
//   await recording.prepareToRecordAsync();
//   await recording.startAsync();
//   return recording;
// };

// const stopRecording = async (recording?: Audio.Recording) => {
//   if (!recording) {
//     return;
//   }

//   const status = await recording.getStatusAsync();
//   if (status.isRecording) {
//     await recording.stopAndUnloadAsync();
//   }
// };

// const checkCanRecord = (permissions: PermissionMap) => {
//   if (permissions[AUDIO_RECORDING]?.granted) {
//     return;
//   }

//   Alert.alert(
//     "Unable to record",
//     "We can't access your microphone, please update your permissions in the Settings app...",
//     [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Settings",
//         onPress: () => Linking.openURL("app-settings:"),
//       },
//     ]
//   );

//   throw new Error("Permission not granted to access microphone");
// }


// const RecordingProvider = ({ children }: Props) => {
//   const { permissions } = useContext(Permissions);
//   const [recording, setRecording] = useState<Audio.Recording>();

//   useEffect(() => {
//     Audio.setAudioModeAsync({
//       allowsRecordingIOS: true,
//       interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//       playsInSilentModeIOS: true,
//       shouldDuckAndroid: true,
//       interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
//       playThroughEarpieceAndroid: false,
//       staysActiveInBackground: true,
//     });
//   }, []);

//   return (
//     <Recording.Provider
//       value={{
//         stop: async () => {
//           await stopRecording(recording);
//           setRecording(undefined);
//         },
//         record: async (key: string) => {
//           await stopRecording(recording);
//           checkCanRecord(permissions);
//           setRecording(
//             await record((status) => {
//               if (!status.isDoneRecording) {
//                 return;
//               }

//               const uri = recording?.getURI();
//               if (!uri) {
//                 return;
//               }

//               AsyncStorage.setItem(key, uri)
//                 .catch(console.error);
//             })
//           );
//         },
//       }}
//     >
//       {children}
//     </Recording.Provider>
//   );
// };

// export default RecordingProvider;
