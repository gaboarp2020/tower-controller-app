import React from 'react';
import {Keyboard, StyleSheet, TouchableOpacityProps} from 'react-native';

import {Button} from '.';

import {Icon} from '.';

/**
 * @property {string} action - Actions of the component.
 * Can be `up`, `down`, `front`, `back`, `stop`.
 *
 */

export interface PropTypes extends TouchableOpacityProps {
  action: 'up' | 'down' | 'front' | 'back' | 'stop';
  iconColor: string;
}

const ActionButton = ({
  action,
  iconColor,
  onPress,
  ...props
}: PropTypes): React.ReactElement => {
  const ActionIcon = ({
    action,
    iconColor,
  }: {
    action: string;
    iconColor: string;
  }) => {
    if (action === 'up') {
      return UpArrowIcon(iconColor);
    }

    if (action === 'down') {
      return DownArrowIcon(iconColor);
    }

    if (action === 'front') {
      return FrontArrowIcon(iconColor);
    }

    if (action === 'back') {
      return BackArrowIcon(iconColor);
    }

    return StopIcon(iconColor);
  };

  const actionIconStyle = {
    marginRigth: 10,
  };

  const UpArrowIcon = (iconColor: string) => (
    <Icon.UpArrow fill={iconColor} style={actionIconStyle} />
  );

  const DownArrowIcon = (iconColor: string) => (
    <Icon.DownArrow fill={iconColor} style={actionIconStyle} />
  );

  const FrontArrowIcon = (iconColor: string) => (
    <Icon.FrontArrow fill={iconColor} style={actionIconStyle} />
  );

  const BackArrowIcon = (iconColor: string) => (
    <Icon.BackArrow fill={iconColor} style={actionIconStyle} />
  );

  const StopIcon = (iconColor: string) => (
    <Icon.Stop fill={iconColor} style={actionIconStyle} />
  );

  return (
    <Button
      appearance="outline"
      onPress={event => {
        Keyboard.dismiss();
        onPress && onPress(event);
      }}
      size="medium"
      status="basic"
      style={styles.roundButton}
      {...props}>
      {ActionIcon({action, iconColor})}
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
    backgroundColor: 'white',
  },
});

export default ActionButton;
