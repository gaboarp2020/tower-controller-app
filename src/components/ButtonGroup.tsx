import { ButtonProps } from '@ui-kitten/components';
import React from 'react';
import { FlexStyle, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import Group from './Group';

interface ProptTypes {
  alignment?: FlexStyle['justifyContent'];
  children: React.ReactElement<ButtonProps>[];
  direction?: FlexStyle['flexDirection'];
  style?: StyleProp<ViewStyle>;
}

const ButtonGroup = ({
  alignment = 'center',
  children,
  direction = 'row',
  style,
}: ProptTypes): React.ReactElement => (
  <Group
    style={[
      styles.group,
      { flexDirection: direction, justifyContent: alignment },
      style,
    ]}
  >
    {(Array.isArray(children) ? children : [children]).map((child, key) => {
      const childStyle = [child.props.style, styles.child];

      return React.cloneElement(child, { key, style: childStyle });
    })}
  </Group>
);

const styles = StyleSheet.create({
  child: {
    flex: 1,
  },
  group: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

export default ButtonGroup;
