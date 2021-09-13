import React, { useState } from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { atom, useRecoilState } from "recoil";

import { ActionButton } from ".";

export const actionState = atom({
  key: "actionState",
  default: 'stop',
});
export const isTimerStartState = atom({
  key: "isTimerStartState",
  default: false,
});
export const isStopwatchStartState = atom({
  key: "isStopwatchStartState",
  default: false,
});
export const timerDurationState = atom({
  key: "timerDurationState",
  default: 90000,
});
export const resetTimerState = atom({
  key: "resetTimerState",
  default: false,
});
export const resetStopwatchState = atom({
  key: "resetStopwatchState",
  default: false,
});

const ActionButtonGroup = () => {
  const [upActionButtonState, setUpActionButtonState] = useState<boolean>(false);
  const [downActionButtonState, setDownActionButtonState] = useState<boolean>(false);
  const [frontActionButtonState, setFrontActionButtonState] = useState<boolean>(false);
  const [backActionButtonState, setBackActionButtonState] = useState<boolean>(false);
  const [stopActionButtonDisabledState, setStopActionButtonDisabledState] = useState<boolean>(true)

  const [actionName, setActionName] = useRecoilState(actionState);

  const [isStopwatchStart, setIsStopwatchStart] = useRecoilState(isStopwatchStartState);
  const [resetStopwatch, setResetStopwatch] = useRecoilState(resetStopwatchState);

  const handleAction = (actionName: string, setStateCallBack: CallableFunction) => {
    startTimer();
    setDisabledAllActionButton(true);
    setStopActionButtonDisabledState(false);
    setStateCallBack(false);
    setActionName(actionName);
  };

  const handleUpAction = (event: GestureResponderEvent): void => {
    handleAction('up', setUpActionButtonState);

    // TODO: API Callback?
  }

  const handleDownAction = (event: GestureResponderEvent): void => {
    handleAction('down', setDownActionButtonState);

    // TODO: API Callback?
  }

  const handleFrontAction = (event: GestureResponderEvent): void => {
    handleAction('front', setFrontActionButtonState);

    // TODO: API Callback?
  }

  const handleBackAction = (event: GestureResponderEvent): void => {
    handleAction('back', setBackActionButtonState);

    // TODO: API Callback?
  }

  const handleStopAction = (event: GestureResponderEvent): void => {
    resetTimer();
    setDisabledAllActionButton(false);
    setStopActionButtonDisabledState(true);
    setActionName('stop');
    
    // TODO: API Callback?
  }

  const setDisabledAllActionButton = (disabled: boolean = false) => {
    setUpActionButtonState(disabled);
    setDownActionButtonState(disabled);
    setFrontActionButtonState(disabled);
    setBackActionButtonState(disabled);
  }

  const startTimer = () => {
    setIsStopwatchStart(true);
    setResetStopwatch(false);
  }

  const resetTimer = () => {
    setIsStopwatchStart(false);
    setResetStopwatch(true);
  }

  return (
    <View style={styles.container}>
      <View style={{marginTop: "auto", marginBottom: "auto"}}>
        <View style={styles.row}>
          <ActionButton
            action="up"
            disabled={upActionButtonState}
            onPress={handleUpAction}
          />
        </View>
        
        <View style={styles.row}>
          <ActionButton
            action="front"
            disabled={frontActionButtonState}
            onPress={handleFrontAction}
          />
          <ActionButton
            action="stop"
            disabled={stopActionButtonDisabledState}
            onPress={handleStopAction}
          />
          <ActionButton
            action="back"
            disabled={backActionButtonState}
            onPress={handleBackAction}
          />
        </View>
        
        <View style={styles.row}>
          <ActionButton
            action="down"
            disabled={downActionButtonState}
            onPress={handleDownAction}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default ActionButtonGroup