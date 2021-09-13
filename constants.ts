import { Dimensions, Platform } from 'react-native';

const { height: heightWindow, width: widthWindow } = Dimensions.get('window');
const { height: heightScreen, width: widthScreen } = Dimensions.get('screen');

const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

const ANDROID_NAVIGATION_BAR = 48;
const ANDROID_STATUSBAR = 24;

const WINDOW_HEIGHT = heightWindow;
const WINDOW_WIDTH = widthWindow;

const DEVICE_HEIGHT = heightScreen;
const DEVICE_WIDTH = widthScreen;

export default {
  ANDROID_NAVIGATION_BAR,
  ANDROID_STATUSBAR,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  IS_ANDROID,
  IS_IOS,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
};