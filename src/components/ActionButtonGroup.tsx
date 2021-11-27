import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {atom, useRecoilState} from 'recoil';

import {ActionButton} from '.';
import {elevationApi, inclinationApi} from '../api/action';
import checkHardwareApi from '../api/checkHardware';
import stopApi from '../api/stop';

const ACTIVE_COLOR = '#FFF';
const ACTIVE_BACKGROUND = '#109e92';
const DISABLE_COLOR = 'grey';
const DISABLE_BACKGROUND = '#FFF';

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
export const connectionInterruptState = atom({
  default: false,
  key: 'connectionInterruptState',
});
export const isConnectingState = atom({
  default: false,
  key: 'isConnectingState',
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

  const [upIconColorState, setUpIconColorState] = useState<string>(ACTIVE_COLOR);
  const [downIconColorState, setDownIconColorState] = useState<string>(ACTIVE_COLOR);
  const [frontIconColorState, setFrontIconColorState] =
    useState<string>(ACTIVE_COLOR);
  const [backIconColorState, setBackIconColorState] = useState<string>(ACTIVE_COLOR);
  const [stopIconColorState, setStopIconColorState] =
    useState<string>(DISABLE_COLOR);

  const [upBackgroundColorState, setUpBackgroundColorState] = useState<string>(ACTIVE_BACKGROUND);
  const [downBackgroundColorState, setDownBackgroundColorState] =
    useState<string>(ACTIVE_BACKGROUND);
  const [frontBackgroundColorState, setFrontBackgroundColorState] = useState<string>(ACTIVE_BACKGROUND);
  const [backBackgroundColorState, setBackBackgroundColorState] = useState<string>(ACTIVE_BACKGROUND);
  const [stopBackgroundColorState, setStopBackgroundColorState] =
    useState<string>(DISABLE_BACKGROUND);

  // eslint-disable @typescript-eslint/no-unused-vars
  const [_, setActionName] = useRecoilState(actionState);
  // eslint-disable @typescript-eslint/no-unused-vars
  const [__, setIsStopwatchStart] = useRecoilState(isStopwatchStartState);
  // eslint-disable @typescript-eslint/no-unused-vars
  const [___, setResetStopwatch] = useRecoilState(resetStopwatchState);
  // eslint-disable @typescript-eslint/no-unused-vars
  const [____, setConnectionInterrupt] = useRecoilState(connectionInterruptState);
  // eslint-disable @typescript-eslint/no-unused-vars
  const [_____, setIsConnecting] = useRecoilState(isConnectingState);

  const handleAction = (
    actionName: string,
    setActionStateCallBack: CallableFunction,
    setIconStateCallBack: CallableFunction,
    setBackgroundStateCallBack: CallableFunction,
  ) => {
    startTimer();
    setDisabledAllActionButton(true, DISABLE_COLOR, DISABLE_BACKGROUND);
    setStopActionButtonDisabledState(false);
    setStopIconColorState(ACTIVE_COLOR);
    setStopBackgroundColorState(ACTIVE_BACKGROUND);
    setActionStateCallBack(false);
    setIconStateCallBack(ACTIVE_COLOR);
    setBackgroundStateCallBack(ACTIVE_BACKGROUND);
    setActionName(actionName);
    handleCheck();
  };

  const handleCheck = async (): Promise<void> => {
    await checkHardwareApi.get().then((isSucceed) => {
      if (!isSucceed) {
        setConnectionInterrupt(true);
      }
      setIsConnecting(false);
    });
  };

  const handleUpAction = async (): Promise<void> => {
    handleAction('up', setUpActionButtonState, setUpIconColorState, setUpBackgroundColorState);
    await elevationApi.set(DIRECTION_UP);
  };

  const handleDownAction = async (): Promise<void> => {
    handleAction('down', setDownActionButtonState, setDownIconColorState, setDownBackgroundColorState);
    await elevationApi.set(DIRECTION_DOWN);
  };

  const handleFrontAction = async (): Promise<void> => {
    handleAction('front', setFrontActionButtonState, setFrontIconColorState, setFrontBackgroundColorState);
    await inclinationApi.set(DIRECTION_UP);
  };

  const handleBackAction = async (): Promise<void> => {
    handleAction('back', setBackActionButtonState, setBackIconColorState, setBackBackgroundColorState);
    await inclinationApi.set(DIRECTION_DOWN);
  };

  const handleStopAction = async (): Promise<void> => {
    resetTimer();
    setDisabledAllActionButton(false, ACTIVE_COLOR, ACTIVE_BACKGROUND);
    setStopActionButtonDisabledState(true);
    setStopIconColorState(DISABLE_COLOR);
    setStopBackgroundColorState(DISABLE_BACKGROUND);
    setActionName('stop');
    await stopApi.get();
  };

  const setDisabledAllActionButton = (
    disabled: boolean = false,
    iconColor: string,
    backgroundColor: string,
  ) => {
    setUpActionButtonState(disabled);
    setDownActionButtonState(disabled);
    setFrontActionButtonState(disabled);
    setBackActionButtonState(disabled);

    setUpIconColorState(iconColor);
    setDownIconColorState(iconColor);
    setFrontIconColorState(iconColor);
    setBackIconColorState(iconColor);

    setUpBackgroundColorState(backgroundColor);
    setDownBackgroundColorState(backgroundColor);
    setFrontBackgroundColorState(backgroundColor);
    setBackBackgroundColorState(backgroundColor);
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
            backgroundColor={upBackgroundColorState}
            disabled={upActionButtonState}
            onPress={handleUpAction}
          />
        </View>

        <View style={styles.row}>
          <ActionButton
            action="front"
            iconColor={frontIconColorState}
            backgroundColor={frontBackgroundColorState}
            disabled={frontActionButtonState}
            onPress={handleFrontAction}
          />
          <ActionButton
            action="stop"
            iconColor={stopIconColorState}
            backgroundColor={stopBackgroundColorState}
            disabled={stopActionButtonDisabledState}
            onPress={handleStopAction}
          />
          <ActionButton
            action="back"
            iconColor={backIconColorState}
            backgroundColor={backBackgroundColorState}
            disabled={backActionButtonState}
            onPress={handleBackAction}
          />
        </View>

        <View style={styles.row}>
          <ActionButton
            action="down"
            iconColor={downIconColorState}
            backgroundColor={downBackgroundColorState}
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
