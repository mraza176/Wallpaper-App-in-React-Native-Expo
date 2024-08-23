import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Entypo, Octicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Toast from "react-native-toast-message";
import { heightPercentage, widthPercentage } from "../../helpers/common";
import { theme } from "../../constants/theme";

const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();

  const filename = item?.previewURL?.split("/").pop();
  const filepath = `${FileSystem.documentDirectory}${filename}`;

  const [status, setStatus] = useState("loading");

  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;
    const maxWidth =
      Platform.OS === "web" ? widthPercentage(50) : widthPercentage(92);
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;
    if (aspectRatio < 1) {
      calculatedWidth = calculatedHeight * aspectRatio;
    }
    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  const onLoad = () => {
    setStatus("");
  };

  const handleDownloadImage = async () => {
    setStatus("downloading");
    let uri = await downloadFile();
    if (uri) showToast({ message: "Image downloaded" });
  };

  const handleShareImage = async () => {
    setStatus("sharing");
    let uri = await downloadFile();
    if (uri) {
      await Sharing.shareAsync(uri);
    }
  };

  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(
        item?.webformatURL,
        filepath
      );
      setStatus("");
      return uri;
    } catch (error) {
      console.error(error);
      setStatus("");
      Alert.alert("Error", "Failed to download image");
      return null;
    }
  };

  const showToast = ({ message }) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
  };

  const toastConfig = {
    success: ({ text1, props, ...rest }) => (
      <View style={styles.toast}>
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    ),
  };

  return (
    <BlurView
      tint="dark"
      intensity={60}
      //   experimentalBlurMethod="dimezisBlurView"
      style={styles.container}
    >
      <View style={getSize()}>
        <View style={styles.loading}>
          {status == "loading" && (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>
        <Image
          source={item?.webformatURL}
          transition={100}
          style={[styles.image, getSize()]}
          onLoad={onLoad}
        />
      </View>
      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable onPress={() => router.back()} style={styles.button}>
            <Octicons name="x" size={24} color="white" />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          {status == "downloading" ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Pressable onPress={handleDownloadImage} style={styles.button}>
              <Octicons name="download" size={24} color="white" />
            </Pressable>
          )}
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status == "sharing" ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Pressable onPress={handleShareImage} style={styles.button}>
              <Entypo name="share" size={22} color="white" />
            </Pressable>
          )}
        </Animated.View>
      </View>
      <Toast config={toastConfig} visibilityTime={2500} />
    </BlurView>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: widthPercentage(4),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  button: {
    height: heightPercentage(6),
    width: heightPercentage(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  toast: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: theme.radius.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  toastText: {
    fontSize: heightPercentage(1.8),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.white,
  },
});
