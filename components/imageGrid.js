import { StyleSheet, Text, View } from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./imageCard";
import { getColumnsCount, widthPercentage } from "../helpers/common";

const ImageGrid = ({ images, router }) => {
  const columns = getColumnsCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        initialNumToRender={1000}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item, index }) => (
          <ImageCard
            item={item}
            index={index}
            columns={columns}
            router={router}
          />
        )}
        estimatedItemSize={19}
      />
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: widthPercentage(100),
  },
  listContainerStyle: {
    paddingHorizontal: widthPercentage(4),
  },
});
