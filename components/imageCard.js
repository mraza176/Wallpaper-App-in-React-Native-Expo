import { Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { getImageSize, widthPercentage } from "../helpers/common";
import { theme } from "../constants/theme";

const ImageCard = ({ item, index, columns, router }) => {
  const getImageHeight = () => {
    const { imageWidth: width, imageHeight: height } = item;
    return { height: getImageSize(height, width) };
  };

  const isLastInRow = () => {
    return (index + 1) % columns === 0;
  };
  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: "home/image", params: { ...item } })
      }
      style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}
    >
      <Image
        style={[styles.image, getImageHeight()]}
        source={item?.webformatURL}
        transition={100}
      />
    </Pressable>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBg,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: widthPercentage(2),
  },
  spacing: {
    marginRight: widthPercentage(2),
  },
});
