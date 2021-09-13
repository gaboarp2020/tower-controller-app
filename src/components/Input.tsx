import { Input, TextProps } from '@ui-kitten/components';
import React from 'react';
import {
  ImageProps,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextStyle,
} from 'react-native';

import Text from './Text';
import { RenderProp } from './types';

export type InputSize = 'large' | 'medium' | 'small' | undefined;

export type InputStatus =
  | 'basic'
  | 'control'
  | 'danger'
  | 'info'
  | 'primary'
  | 'success'
  | 'warning'
  | undefined;

/**
 * @property {string} value - A value displayed in input field.
 *
 * @property {(string) => void} onChangeText - Called when the value should be changed.
 *
 * @property {() => void} onFocus - Called when input field becomes focused.
 *
 * @property {() => void} onBlur - Called when input field looses focus.
 *
 * @property {string} placeholder - A string to be displayed when there is no value.
 *
 * @property {boolean} disabled - Whether input field is disabled.
 * This property overrides `editable` property of TextInput.
 *
 * @property {string} error - Input Error
 *
 * @property {ReactText | (TextProps) => ReactElement} label - String, number or a function component
 * to render above the input field.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactText | (TextProps) => ReactElement} caption - String, number or a function component
 * to render below the input field.
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
 * @property {(ImageProps) => ReactElement} captionIcon - Function component
 * to render to start of the *caption*.
 * Expected to return an Image.
 *
 * @property {string} size - Size of the component.
 * Can be `small`, `medium` or `large`.
 * Defaults to *medium*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 * Useful for giving user a hint on the input validity.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes the style of the text field.
 *
 * @property {TextInputProps} ...TextInputProps - Any props applied to TextInput component.
 */
interface PropTypes extends TextInputProps {
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  caption?: React.ReactText | RenderProp<TextProps>;
  captionIcon?: RenderProp<Partial<ImageProps>>;
  disabled?: boolean;
  error?: string;
  label?: React.ReactText | RenderProp<TextProps>;
  onBlur?: (e?: any) => void;
  onChangeText?: (newValue: string) => void;
  onFocus?: (e?: any) => void;
  placeholder?: string;
  size?: InputSize;
  status?: InputStatus;
  textStyle?: StyleProp<TextStyle>;
  value?: string;
}

const CustomInput = ({
  accessoryLeft,
  accessoryRight,
  caption,
  captionIcon,
  disabled = false,
  error,
  label,
  onBlur,
  onChangeText,
  onFocus,
  placeholder,
  secureTextEntry = false,
  size = 'medium',
  status = 'basic',
  textStyle,
  value,
  ...props
}: PropTypes): React.ReactElement => (
  <>
    <Input
      accessoryLeft={accessoryLeft}
      accessoryRight={accessoryRight}
      caption={caption}
      captionIcon={captionIcon}
      disabled={disabled}
      label={label}
      onBlur={onBlur}
      onChangeText={onChangeText}
      onFocus={onFocus}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      size={size}
      status={status}
      textStyle={[styles.text, textStyle]}
      value={value}
      {...props}
    />
    {error && <Text status="danger">{error}</Text>}
  </>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'sans-serif',
    letterSpacing: 1,
  },
});

export default CustomInput;