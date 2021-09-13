import React from 'react';
import {StyleSheet, View} from 'react-native';

import {
  ActionButtonGroup,
  ActionMessage,
  Screen,
  Timer,
} from '../../components';
import {AppRoutes} from '../../navigation/routes';
import {ScreenProps} from '../../navigation/types';

const TowerControlScreen = ({
  navigation,
  route,
}: ScreenProps<AppRoutes.HOME>) => {
  return (
    <Screen>
      <Screen.Container>
        <View style={styles.container}>
          <Timer />
          <ActionButtonGroup />
          <ActionMessage />
        </View>
      </Screen.Container>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default TowerControlScreen;
