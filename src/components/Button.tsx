import {Button, TextProps} from '@ui-kitten/components';
import React from 'react';
import {
  FlexStyle,
  ImageProps,
  Keyboard,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

import {RenderProp} from './types';

import Spinner from './Spinner';

/**
 * @property {string} align - Can be `center`, `left` or `right`
 * Defaults to *center*
 *
 * @property {ReactText | (TextProps) => ReactElement} children - String, number or a function component
 * to render within the button.
 * If it is a function, expected to return a Text.
 *
 * @property {(ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the text.
 * Expected to return an Image.
 *
 * @property {(ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the text.
 * Expected to return an Image.
 *
 * @property {string} appearance - Appearance of the component.
 * Can be `filled`, `outline` or `ghost`.
 * Defaults to *filled*.
 *
 * @property {boolean} loading - Loading status.
 *
 * @property {number} radius - Border Radius.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *medium*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 */
export interface PropTypes extends TouchableOpacityProps {
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  align?: Align;
  appearance?: 'filled' | 'outline' | 'ghost';
  children?: RenderProp<TextProps> | React.ReactText | any;
  loading?: boolean;
  radius?: number;
  size?: 'giant' | 'large' | 'medium' | 'small' | 'tiny';
  status?:
    | 'basic'
    | 'control'
    | 'danger'
    | 'info'
    | 'primary'
    | 'success'
    | 'warning';
}

type Align = 'center' | 'left' | 'right';

const MAP_ALIGN_TO_FLEX: Record<Align, FlexStyle['justifyContent']> = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
};

const flexAlignment = (align: Align) => MAP_ALIGN_TO_FLEX[align];

const CustomButton = ({
  accessoryLeft,
  accessoryRight,
  align = 'center',
  appearance = 'filled',
  children,
  loading,
  onPress,
  radius = 50,
  size = 'medium',
  status = 'primary',
  style,
  ...props
}: PropTypes): React.ReactElement => (
  <Button
    accessoryLeft={accessoryLeft}
    accessoryRight={accessoryRight}
    appearance={appearance}
    onPress={event => {
      Keyboard.dismiss();
      onPress && onPress(event);
    }}
    size={size}
    status={status}
    style={[
      styles.base,
      {borderRadius: radius, justifyContent: flexAlignment(align)},
      style,
    ]}
    {...props}>
    {loading ? <Spinner animating size={size} status="basic" /> : children}
  </Button>
);

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
});

export default CustomButton;
