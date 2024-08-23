import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { data } from "../constants/data";
import { heightPercentage, widthPercentage } from "../helpers/common";
import { theme } from "../constants/theme";
import Animated, { FadeInRight } from "react-native-reanimated";

const Categories = ({ activeCategory, handleChangeCategory }) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatlistContainer}
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <CategoryItem
          title={item}
          index={index}
          isActive={activeCategory == item}
          handleChangeCategory={handleChangeCategory}
        />
      )}
    />
  );
};

const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {
  let color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
  let backgroundColor = isActive
    ? theme.colors.neutral(0.8)
    : theme.colors.white;
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <Pressable
        onPress={() => handleChangeCategory(isActive ? null : title)}
        style={[styles.category, { backgroundColor }]}
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: widthPercentage(4),
    gap: 8,
  },
  category: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBg,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  title: {
    fontSize: heightPercentage(1.8),
    fontWeight: theme.fontWeights.medium,
  },
});
