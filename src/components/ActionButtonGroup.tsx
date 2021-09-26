import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {atom, useRecoilState} from 'recoil';

import {ActionButton} from '.';
import {elevationApi, inclinationApi} from '../api/action';
import stopApi from '../api/stop';

export const actionState = atom({
  default: 'stop',
  key: 'actionState',
});
export const isTimerStartState = atom({
  default: false,
  key: 'isTimerStartState',
});
export const isStopwatchStartState = atom({
  default: false,
  key: 'isStopwatchStartState',
});
export const timerDurationState = atom({
  default: 90000,
  key: 'timerDurationState',
});
export const resetTimerState = atom({
  default: false,
  key: 'resetTimerState',
});
export const resetStopwatchState = atom({
  default: false,
  key: 'resetStopwatchState',
});

const ActionButtonGroup = () => {
  const DIRECTION_UP = 1;
  const DIRECTION_DOWN = 2;

  const [upActionButtonState, setUpActionButtonState] =
    useState<boolean>(false);
  const [downActionButtonState, setDownActionButtonState] =
    useState<boolean>(false);
  const [frontActionButtonState, setFrontActionButtonState] =
    useState<boolean>(false);
  const [backActionButtonState, setBackActionButtonState] =
    useState<boolean>(false);
  const [stopActionButtonDisabledState, setStopActionButtonDisabledState] =
    useState<boolean>(true);

  const [upIconColorState, setUpIconColorState] = useState<string>('grey');
  const [downIconColorState, setDownIconColorState] = useState<string>('grey');
  const [frontIconColorState, setFrontIconColorState] =
    useState<string>('grey');
  const [backIconColorState, setBackIconColorState] = useState<string>('grey');
  const [stopIconColorState, setStopIconColorState] =
    useState<string>('lightgrey');

  // eslint-disable @typescript-eslint/no-unused-vars
  const [_, setActionName] = useRecoilState(actionState);
  // eslint-disable @typescript-eslint/no-unused-vars
  const [__, setIsStopwatchStart] = useRecoilState(isStopwatchStartState);
  // eslint-disable @typescript-eslint/no-unused-vars
  const [___, setResetStopwatch] = useRecoilState(resetStopwatchState);

  const handleAction = (
    actionName: string,
    setActionStateCallBack: CallableFunction,
    setIconStateCallBack: CallableFunction,
  ) => {
    startTimer();
    setDisabledAllActionButton(true, 'lightgrey');
    setStopActionButtonDisabledState(false);
    setStopIconColorState('grey');
    setActionStateCallBack(false);
    setIconStateCallBack('grey');
    setActionName(actionName);
  };

  const handleUpAction = async (): Promise<void> => {
    try {
      await elevationApi.set(DIRECTION_UP);
      handleAction('up', setUpActionButtonState, setUpIconColorState);
    } catch (error) {
      // TODO: Error handler
    }
  };

  const handleDownAction = async (): Promise<void> => {
    try {
      await elevationApi.set(DIRECTION_DOWN);
      handleAction('down', setDownActionButtonState, setDownIconColorState);
    } catch (error) {
      // TODO: Error handler
    }
  };

  const handleFrontAction = async (): Promise<void> => {
    try {
      await inclinationApi.set(DIRECTION_UP);
      handleAction('front', setFrontActionButtonState, setFrontIconColorState);
    } catch (error) {
      // TODO: Error handler
    }
  };

  const handleBackAction = async (): Promise<void> => {
    try {
      await inclinationApi.set(DIRECTION_DOWN);
      handleAction('back', setBackActionButtonState, setBackIconColorState);
    } catch (error) {
      // TODO: Error handler
    }
  };

  const handleStopAction = async (): Promise<void> => {
    try {
      await stopApi.get();
      resetTimer();
      setDisabledAllActionButton(false, 'grey');
      setStopActionButtonDisabledState(true);
      setStopIconColorState('lightgrey');
      setActionName('stop');
    } catch (error) {
      // TODO: Error handler
    }
  };

  const setDisabledAllActionButton = (
    disabled: boolean = false,
    color: string,
  ) => {
    setUpActionButtonState(disabled);
    setDownActionButtonState(disabled);
    setFrontActionButtonState(disabled);
    setBackActionButtonState(disabled);

    setUpIconColorState(color);
    setDownIconColorState(color);
    setFrontIconColorState(color);
    setBackIconColorState(color);
  };

  const startTimer = () => {
    setIsStopwatchStart(true);
    setResetStopwatch(false);
  };

  const resetTimer = () => {
    setIsStopwatchStart(false);
    setResetStopwatch(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.row}>
          <ActionButton
            action="up"
            iconColor={upIconColorState}
            disabled={upActionButtonState}
            onPress={handleUpAction}
          />
        </View>

        <View style={styles.row}>
          <ActionButton
            action="front"
            iconColor={frontIconColorState}
            disabled={frontActionButtonState}
            onPress={handleFrontAction}
          />
          <ActionButton
            action="stop"
            iconColor={stopIconColorState}
            disabled={stopActionButtonDisabledState}
            onPress={handleStopAction}
          />
          <ActionButton
            action="back"
            iconColor={backIconColorState}
            disabled={backActionButtonState}
            onPress={handleBackAction}
          />
        </View>

        <View style={styles.row}>
          <ActionButton
            action="down"
            iconColor={downIconColorState}
            disabled={downActionButtonState}
            onPress={handleDownAction}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ActionButtonGroup;
