import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const widthPercentage = (percentage) => {
  return (width * percentage) / 100;
};

export const heightPercentage = (percentage) => {
  return (height * percentage) / 100;
};

export const getColumnsCount = () => {
  if (width >= 1024) return 4;
  else if (width >= 768) return 3;
  else return 2;
};

export const getImageSize = (height, width) => {
  if (width > height) return 250;
  else if (width < height) return 300;
  else return 200;
};

export const capitalize = (str) => {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};
