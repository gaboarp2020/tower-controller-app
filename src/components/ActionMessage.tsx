import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useRecoilState} from 'recoil';

import {actionState} from './ActionButtonGroup';
import {Text} from '.';

const ActionMessage = () => {
  const [actionName] = useRecoilState(actionState);

  return (
    <View style={styles.row}>
      <Text align="center" category="h5">
        {actionName.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ActionMessage;
