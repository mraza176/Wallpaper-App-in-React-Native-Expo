import { Pressable, StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";
import { BlurView } from "expo-blur";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ColorFilter, CommonFilterRow, SectionView } from "./filterViews";
import { capitalize, heightPercentage } from "../helpers/common";
import { theme } from "../constants/theme";
import { data } from "../constants/data";

const sections = {
  order: (props) => <CommonFilterRow {...props} />,
  orientation: (props) => <CommonFilterRow {...props} />,
  type: (props) => <CommonFilterRow {...props} />,
  colors: (props) => <ColorFilter {...props} />,
};

const CustomBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        style,
        styles.overlay,
        containerAnimatedStyle,
      ]}
    >
      <BlurView
        style={StyleSheet.absoluteFill}
        tint="dark"
        intensity={15}
        experimentalBlurMethod="dimezisBlurView"
      />
    </Animated.View>
  );
};

const FiltersModel = ({
  modelRef,
  filters,
  setFilters,
  onClose,
  onApply,
  onReset,
}) => {
  const snapPoints = useMemo(() => ["75%"], []);
  return (
    <BottomSheetModal
      ref={modelRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
      //   onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filetrText}>Filters</Text>
          {Object.keys(sections).map((sectionName, index) => {
            let sectionView = sections[sectionName];
            let title = capitalize(sectionName);
            let sectionData = data.filters[sectionName];
            return (
              <Animated.View
                entering={FadeInDown.delay(index * 100 + 100)
                  .springify()
                  .damping(11)}
                key={sectionName}
              >
                <SectionView
                  title={title}
                  content={sectionView({
                    data: sectionData,
                    filterName: sectionName,
                    filters,
                    setFilters,
                  })}
                />
              </Animated.View>
            );
          })}
          <Animated.View
            entering={FadeInDown.delay(500).springify().damping(11)}
            style={styles.buttons}
          >
            <Pressable style={styles.resetButton} onPress={onReset}>
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.colors.neutral(0.9) },
                ]}
              >
                Reset
              </Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={onApply}>
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                Apply
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default FiltersModel;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    flex: 1,
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filetrText: {
    fontSize: heightPercentage(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  applyButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.8),
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
  },
  resetButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.03),
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.colors.grayBg,
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
  },
  buttonText: {
    fontSize: heightPercentage(2.2),
  },
});
