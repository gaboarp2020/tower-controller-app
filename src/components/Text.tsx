import { Text } from '@ui-kitten/components';
import React from 'react';
import { ColorValue, StyleSheet, TextProps as RNTextProps } from 'react-native';

/**
 * @property {string} align - Can be `auto`, `center`, `justify`, `left` or `right`
 * Defaults to *auto*
 *
 * @property {string} appearance - Can be `default`, `alternative` or `hint`.
 * Use `alternative` for displaying light text on a dark content and vice versa.
 * Use `hint` for giving user a hint on something.
 *
 * @property {string} category - Can be `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `s1`, `s2`, `p1`, `p2`, `c1`, `c2`, `label`.
 * Defaults to *p1*.
 * Use *h* categories when needed to display headings.
 * Use *s* categories when needed to display subtitles.
 * Use *p* categories when needed to display regular text.
 * Use *c* and *label* categories when needed to give user a hint on something.
 *
 * @property {string} children - Plain text
 * Use when want to display a text outside of the Dictionary (1)
 * it's displayed only when the text property and rawText are not defined
 *
 * @property {ColorValue} color
 * Font color
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 * Use *control* status when needed to display within a contrast container.
 */
export interface PropTypes extends RNTextProps {
  align?: 'auto' | 'center' | 'justify' | 'left' | 'right';
  appearance?: 'alternative' | 'default' | 'hint';
  category?:
    | 'c1'
    | 'c2'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'label'
    | 'p1'
    | 'p2'
    | 's1'
    | 's2';
  children?: string | number;
  color?: ColorValue;
  status?:
    | 'basic'
    | 'control'
    | 'danger'
    | 'info'
    | 'primary'
    | 'success'
    | 'warning';
}

const CustomText = ({
  align = 'auto',
  appearance = 'default',
  category = 'p1',
  children,
  color = '#333',
  status = 'basic',
  style,
  ...props
}: PropTypes): React.ReactElement => (
  <Text
    appearance={appearance}
    category={category}
    status={status}
    style={[styles.base, { color, textAlign: align }, style]}
    {...props}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
});

export default CustomText;