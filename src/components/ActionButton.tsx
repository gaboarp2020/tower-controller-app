import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

import { Button } from '.';

import { Icon } from '.';

/**
* @property {string} action - Actions of the component.
* Can be `up`, `down`, `front`, `back`, `stop`.
*
*/

export interface PropTypes extends TouchableOpacityProps {
  action:
    | 'up'
    | 'down'
    | 'front'
    | 'back'
    | 'stop';
}

const ActionButton = ({
  action,
  onPress,
  ...props
}: PropTypes): React.ReactElement => {

  const ActionIcon = (action: string) => {
    if (action === 'up') {
      return UpArrowIcon();
    }
    
    if (action === 'down') {
      return DownArrowIcon();
    }
    
    if (action === 'front') {
      return FrontArrowIcon();
    }
    
    if (action === 'back') {
      return BackArrowIcon();
    }

    return StopIcon();
  };

  const UpArrowIcon = () => (
    Icon.UpArrow
  );

  const DownArrowIcon = () => (
    Icon.DownArrow
  );

  const FrontArrowIcon = () => (
    Icon.FrontArrow
  );

  const BackArrowIcon = () => (
    Icon.BackArrow
  );

  const StopIcon = () => (
    Icon.Stop
  );

  return (
    <Button
      appearance="outline"
      onPress={(event) => {
        Keyboard.dismiss();
        onPress && onPress(event);
      }}
      size="medium"
      status="basic" 
      style={styles.roundButton}
      {...props}
    >
      {ActionIcon(action)}
    </Button>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    width: 60,
    height: 60,
    margin: 16,
    padding: 10,
    borderWidth: 2,
    borderRadius: 100,
    backgroundColor: "white"
  },
});

export default ActionButton;