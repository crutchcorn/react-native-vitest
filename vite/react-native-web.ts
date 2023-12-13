export * from "react-native-web";

// Needed for react-native-actionsheet
export const ActionSheetIOS = {
  showActionSheetWithOptions: () => {},
  dismissActionSheet: () => {},
  showShareActionSheetWithOptions: () => {},
};

// Fixes: https://github.com/software-mansion/react-native-svg/issues/2020
export const createElement = undefined;

export const PermissionsAndroid = undefined;
