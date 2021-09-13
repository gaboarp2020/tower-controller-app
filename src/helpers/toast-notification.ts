import { ToastAndroid } from 'react-native';

import noop from './noop';

export type Duration = ToastAndroid['LONG'] | ToastAndroid['SHORT'];

export type Gravity =
  | ToastAndroid['BOTTOM']
  | ToastAndroid['CENTER']
  | ToastAndroid['TOP'];

export const DURATION_LONG: Duration = ToastAndroid.LONG;
export const DURATION_SHORT: Duration = ToastAndroid.SHORT;

export const GRAVITY_BOTTOM: Gravity = ToastAndroid.BOTTOM;
export const GRAVITY_CENTER: Gravity = ToastAndroid.CENTER;
export const GRAVITY_TOP: Gravity = ToastAndroid.TOP;

interface ToastOpts {
  cb?: () => void;
  duration?: Duration;
  gravity?: Gravity;
}

const showToast = (message: string, duration: Duration, gravity: Gravity) => {
  ToastAndroid.showWithGravity(message, duration, gravity);
};

/**
 * @property {string} message - The message to display
 *
 * @property {ToastOpts} options - Toast Options
 *
 * @property {() => void} options.cb - Call back to run when the Toast is displayed
 *
 * @property {number} options.duration - The life time of the Toast
 * Can be `ToastAndroid.LONG` or `ToastAndroid.SHORT`.
 * Defaults to *ToastAndroid.LONG*.
 *
 * @property {number} options.gravity - The position at the screen of the Toast
 * Can be `ToastAndroid.BOTTOM`, `ToastAndroid.CENTER` or `ToastAndroid.TOP`.
 * Defaults to *ToastAndroid.BOTTOM*.
 */
const toastNotification = (message: string, opts?: ToastOpts) => {
  const { duration = DURATION_LONG, gravity = GRAVITY_BOTTOM, cb = noop } =
    opts || {};

  showToast(message, duration, gravity);

  const timeout = setTimeout(() => {
    cb && cb();
    clearTimeout(timeout);
  }, duration);
};

export default toastNotification;