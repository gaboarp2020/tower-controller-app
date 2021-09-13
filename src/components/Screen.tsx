import {
    Layout,
    TopNavigation,
    TopNavigationAction,
  } from '@ui-kitten/components';
  import React from 'react';
  import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
  
  import constants from '../../constants';
  import Icon, { IconProps } from '../components/Icon';
  import Text from '../components/Text';
  import { AppRoutes } from '../navigation/routes';
  import { ScreenProps } from '../navigation/types';
  import ImageOverlay, { ImageSource, OverlayImageStyle } from './ImageOverlay';
  import KeyboardAvoidingView from './KeyboardAvoidingView';
  import { RenderProp } from './types';
  
  export interface ScreenPropTypes {
    children?: React.ReactNode;
    imageOverlay?: {
      source: ImageSource;
      style?: StyleProp<OverlayImageStyle>;
    };
    style?: StyleProp<ViewStyle>;
  }
  
  export interface ScreenTopNavigationPropTypes {
    navigation?: ScreenProps<AppRoutes>['navigation'];
    route?: ScreenProps<AppRoutes>['route'];
    topNavigation?: {
      icon?: React.ReactElement<RenderProp<Partial<IconProps>>>;
      onPress?: () => void;
      title: string;
    };
  }
  
  export interface ScreenContainerPropTypes {
    align?: ViewStyle['alignContent'];
    children?: React.ReactNode;
    justify?: ViewStyle['justifyContent'];
  }
  
  export const TOP_NAVIGATION_SIZE: number = constants.ANDROID_STATUSBAR * 2;
  
  const Screen = ({
    children,
    imageOverlay,
    style,
  }: ScreenPropTypes): React.ReactElement => (
    <Layout level="1" style={[styles.layout]}>
      <ImageOverlay.Wrapper {...imageOverlay}>
        <KeyboardAvoidingView style={[styles.container, style]}>
          {React.Children.map(children, (child, key) =>
            React.isValidElement(child)
              ? React.cloneElement(child, {
                  key,
                  style: [styles.child, child.props.style],
                })
              : child,
          )}
        </KeyboardAvoidingView>
      </ImageOverlay.Wrapper>
    </Layout>
  );
  
  Screen.TopNavigation = ({
    navigation,
    route,
    topNavigation,
  }: ScreenTopNavigationPropTypes): JSX.Element | null => {
    if (!topNavigation && !route && !navigation) {
      return null;
    }
  
    const config: NonNullable<ScreenTopNavigationPropTypes['topNavigation']> = {
      icon: topNavigation?.icon || Icon.Menu,
      onPress: topNavigation?.onPress || navigation?.toggleDrawer,
      title: topNavigation?.title || route?.name || '',
    };
  
    return (
      <TopNavigation
        accessoryLeft={() => (
          <TopNavigationAction icon={config.icon} onPress={config.onPress} />
        )}
        alignment="center"
        style={[styles.topNavigation]}
        title={() => (
          <Text
            appearance="hint"
            category="h5"
            style={[styles.topNavigationText]}
          >
            {config.title}
          </Text>
        )}
      />
    );
  };
  
  Screen.Container = ({
    align = 'flex-start',
    children,
    justify = 'flex-start',
  }: ScreenContainerPropTypes): JSX.Element | null => (
    <View
      style={[styles.content, { alignContent: align, justifyContent: justify }]}
    >
      {children}
    </View>
  );
  
  const styles = StyleSheet.create({
    child: {
      padding: 12,
    },
    container: {
      bottom: 0,
      flex: 1,
      height: '100%',
      left: 0,
      marginBottom: constants.ANDROID_NAVIGATION_BAR,
      marginTop: constants.ANDROID_STATUSBAR,
      padding: 0,
      position: 'absolute',
      right: 0,
      top: -constants.ANDROID_STATUSBAR,
      width: '100%',
    },
    content: {
      flex: 1,
      padding: 10,
      width: '100%',
    },
    layout: {
      flex: 1,
    },
    topNavigation: {
      height: TOP_NAVIGATION_SIZE,
      width: '100%',
    },
    topNavigationText: {
      textAlign: 'center',
    },
  });
  
  export default Screen;