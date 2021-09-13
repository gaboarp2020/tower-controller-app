import {
    NavigationState,
    PartialState,
    Route,
    RouteProp,
  } from '@react-navigation/core';
  import {
    DrawerContentComponentProps,
    DrawerNavigationProp,
  } from '@react-navigation/drawer';
  import { AppRoutes } from './routes';
  
  export type NavigatorParams = {
    [AppRoutes.HOME]: undefined;
    [AppRoutes.TOWER_CONTROL]: undefined;
    [AppRoutes.WIFI_CONFIGURATION]: undefined;
  };
  
  export type ScreenProps<T extends AppRoutes> = DrawerContentComponentProps & {
    navigation: DrawerNavigationProp<NavigatorParams, T>;
    route: RouteProp<NavigatorParams, T>;
  };
  
  export type NavigationRoute = Route<string> & {
    state?: NavigationState | PartialState<NavigationState>;
  };