import React from 'react';
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface ProptTypes {
  alignment?: FlexStyle['justifyContent'];
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Group = ({
  alignment = 'center',
  children,
  style,
}: ProptTypes): React.ReactElement => (
  <View style={[styles.group, { justifyContent: alignment }, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  group: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 5,
    width: '100%',
  },
});

export default Group;
