import {Icon, IconProps} from '@ui-kitten/components';
import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  ViewStyle,
} from 'react-native';

import {RenderProp} from './types';

interface TouchableIconProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: TouchableWithoutFeedbackProps['style'];
}

interface IconPropTypes extends IconProps {
  fill?: ViewStyle['backgroundColor'];
  height?: number;
  width?: number;
}

export const generateIcon =
  (name: string) =>
  ({
    fill = '#666',
    height = 24,
    width = 24,
    ...props
  }: IconPropTypes): React.ReactElement<RenderProp<Partial<IconProps>>> =>
    (
      <Icon
        {...props}
        name={name}
        style={[props.style, {height, width}]}
        fill={fill}
      />
    );

export const TouchableIcon = ({
  children,
  onPress,
  style,
}: TouchableIconProps) => (
  <TouchableWithoutFeedback onPress={onPress} style={[style]}>
    {children}
  </TouchableWithoutFeedback>
);

const AlertCircle = generateIcon('alert-circle-outline');
const AlertTriangle = generateIcon('alert-triangle-outline');
const Back = generateIcon('arrow-ios-baclk-outline');
const Checkmark = generateIcon('checkmark-circle-2-outline');
const Close = generateIcon('close-outline');
const DoneAll = generateIcon('done-all-outline');
const Email = generateIcon('email-outline');
const Eye = generateIcon('eye-outline');
const EyeOff = generateIcon('eye-off-outline');
const Grid = generateIcon('grid-outline');
const Home = generateIcon('home-outline');
const Info = generateIcon('info-outline');
const Layers = generateIcon('layers-outline');
const Layout = generateIcon('layout-outline');
const Logout = generateIcon('log-out-outline');
const Menu = generateIcon('menu-outline');
const MoreVertical = generateIcon('more-vertical');
const Move = generateIcon('move-outline');
const Person = generateIcon('person-outline');
const RadioButton = generateIcon('radio-button-on-outline');
const Search = generateIcon('search-outline');
const Settings = generateIcon('settings-outline');
const Wifi = generateIcon('wifi-outline');
const UpArrow = generateIcon('arrow-upward-outline');
const DownArrow = generateIcon('arrow-downward-outline');
const FrontArrow = generateIcon('corner-up-right-outline');
const BackArrow = generateIcon('corner-left-down-outline');
const Stop = generateIcon('square-outline');

export default {
  AlertCircle,
  AlertTriangle,
  Back,
  Checkmark,
  Close,
  DoneAll,
  Email,
  Eye,
  EyeOff,
  Grid,
  Home,
  Info,
  Layers,
  Layout,
  Logout,
  Menu,
  MoreVertical,
  Move,
  Person,
  RadioButton,
  Search,
  Settings,
  Wifi,
  UpArrow,
  DownArrow,
  FrontArrow,
  BackArrow,
  Stop,
};
