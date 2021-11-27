import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import React, {useEffect} from 'react';
import {StatusBar, UIManager} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {RecoilRoot} from 'recoil';

import constants from '../constants';
import useHardwareBackButton from './hooks/use-hardware-back-button';
import MainNavigator from './navigation/main.navigator';

// Enable layout animations on Android so that we can animate views to their new
// positions when a layout change happens
if (constants.IS_ANDROID) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = (): React.ReactElement => {
  useHardwareBackButton();

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <RecoilRoot>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <SafeAreaProvider>
          <StatusBar />
          <MainNavigator />
        </SafeAreaProvider>
      </ApplicationProvider>
    </RecoilRoot>
  );
};

export default App;
