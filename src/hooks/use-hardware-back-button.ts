import {useEffect, useRef, useState} from 'react';
import {BackHandler, NativeEventSubscription} from 'react-native';

import toastNotification from '../helpers/toast-notification';

const EXIT_CLICKS = 2;

const useHardwareBackButton = () => {
  const backHandlerRef = useRef<NativeEventSubscription>();

  const [clickCount, setClickCount] = useState<number>(0);

  useEffect(() => {
    backHandlerRef.current = BackHandler.addEventListener(
      'hardwareBackPress',
      (): boolean => {
        setClickCount(clickCount + 1);

        return true;
      },
    );

    return () => {
      if (backHandlerRef.current) {
        backHandlerRef.current.remove();
      }
    };
  });

  useEffect(() => {
    if (clickCount === 0) {
      return;
    }

    if (clickCount < EXIT_CLICKS) {
      toastNotification('Press again to exit', {cb: () => setClickCount(0)});
    } else {
      BackHandler.exitApp();
    }
  }, [clickCount]);

  return {clickCount};
};

export default useHardwareBackButton;
