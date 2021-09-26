import React from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface PropsTypes {
  children?: React.ReactNode;
  [key: string]: any;
}

/**
 * https://github.com/APSL/react-native-keyboard-aware-scroll-view
 */
const KeyboardAvoidingView = ({
  children,
  style = {alignItems: 'center', flexGrow: 1, justifyContent: 'center'},
  ...props
}: PropsTypes): React.ReactElement => {
  const {alignItems, justifyContent, ...contentStyle} =
    StyleSheet.flatten(style);

  return (
    <KeyboardAwareScrollView
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={false}
      bouncesZoom={false}
      enableOnAndroid
      contentContainerStyle={{alignItems, flexGrow: 1, justifyContent}}
      style={[styles.view, contentStyle]}
      {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default KeyboardAvoidingView;
