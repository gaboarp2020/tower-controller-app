import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Stopwatch} from 'react-native-stopwatch-timer';
import {useRecoilState} from 'recoil';

import {isStopwatchStartState, resetStopwatchState} from './ActionButtonGroup';

const Timer = () => {
  const [isStopwatchStart] = useRecoilState(isStopwatchStartState);
  const [resetStopwatch] = useRecoilState(resetStopwatchState);

  return (
    <View style={styles.row}>
      <Stopwatch
        laps
        msecs
        start={isStopwatchStart}
        //To start
        reset={resetStopwatch}
        //To reset
        options={options}
        //options for the styling
      />
    </View>
  );
};

const options = {
  container: {
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#000',
    marginLeft: 7,
  },
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default Timer;
