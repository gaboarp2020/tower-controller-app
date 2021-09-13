import React from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import constants from '../../constants';

export interface OverlayImageStyle extends ViewStyle {
  overlayColor?: string;
}

export interface PropTypes extends ImageBackgroundProps {
  children?: React.ReactNode;
  resizeMode?: ImageBackgroundProps['resizeMode'];
  style?: StyleProp<OverlayImageStyle>;
}

interface WrapperPropTypes {
  children?: React.ReactNode;
  source?: ImageBackgroundProps['source'];
  style?: StyleProp<OverlayImageStyle>;
}

/*
 * @see https://github.com/facebook/react-native/blob/master/Libraries/Image/ImageSourcePropType.js
 */
export interface ImageURISource {
  /**
   * `uri` is a string representing the resource identifier for the image, which
   * could be an http address, a local file path, or the name of a static image
   * resource (which should be wrapped in the `require('./path/to/image.png')`
   * function).
   */
  uri?: string;
  /**
   * `bundle` is the iOS asset bundle which the image is included in. This
   * will default to [NSBundle mainBundle] if not set.
   * @platform ios
   */
  bundle?: string;
  /**
   * `method` is the HTTP Method to use. Defaults to GET if not specified.
   */
  method?: string;
  /**
   * `headers` is an object representing the HTTP headers to send along with the
   * request for a remote image.
   */
  headers?: { [key: string]: string };
  /**
   * `cache` determines how the requests handles potentially cached
   * responses.
   *
   * - `default`: Use the native platforms default strategy. `useProtocolCachePolicy` on iOS.
   *
   * - `reload`: The data for the URL will be loaded from the originating source.
   * No existing cache data should be used to satisfy a URL load request.
   *
   * - `force-cache`: The existing cached data will be used to satisfy the request,
   * regardless of its age or expiration date. If there is no existing data in the cache
   * corresponding the request, the data is loaded from the originating source.
   *
   * - `only-if-cached`: The existing cache data will be used to satisfy a request, regardless of
   * its age or expiration date. If there is no existing data in the cache corresponding
   * to a URL load request, no attempt is made to load the data from the originating source,
   * and the load is considered to have failed.
   *
   * @platform ios
   */
  cache?: 'default' | 'reload' | 'force-cache' | 'only-if-cached';
  /**
   * `body` is the HTTP body to send with the request. This must be a valid
   * UTF-8 string, and will be sent exactly as specified, with no
   * additional encoding (e.g. URL-escaping or base64) applied.
   */
  body?: string;
  /**
   * `width` and `height` can be specified if known at build time, in which case
   * these will be used to set the default `<Image/>` component dimensions.
   */
  width?: number;
  height?: number;
  /**
   * `scale` is used to indicate the scale factor of the image. Defaults to 1.0 if
   * unspecified, meaning that one image pixel equates to one display point / DIP.
   */
  scale?: number;
}

export type ImageRequireSource = number;

export type ImageSource =
  | ImageURISource
  | ImageURISource[]
  | ImageRequireSource;

const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.5)';

const ImageOverlay = ({
  style = {},
  children,
  resizeMode = 'cover',
  ...imageBackgroundProps
}: PropTypes): React.ReactElement<ImageBackgroundProps> => {
  const { overlayColor, ...imageBackgroundStyle } = StyleSheet.flatten(style);

  return (
    <ImageBackground
      {...imageBackgroundProps}
      resizeMode={resizeMode}
      style={[styles.background, imageBackgroundStyle]}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.container,
          { backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR },
        ]}
      />
      {children}
    </ImageBackground>
  );
};

ImageOverlay.Wrapper = ({
  children,
  source,
  style,
}: WrapperPropTypes): React.ReactElement =>
  source ? (
    <ImageOverlay source={source} style={[style]}>
      {children}
    </ImageOverlay>
  ) : (
    <>{children}</>
  );

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    height: constants.DEVICE_HEIGHT,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: constants.DEVICE_WIDTH,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default ImageOverlay;