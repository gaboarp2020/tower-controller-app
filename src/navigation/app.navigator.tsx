import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import DrawerContent from './drawer';
import { drawerRoutes } from './routes';
import { NavigatorParams } from './types';

const {
  Navigator: DrawerNavigator,
  Screen: DrawerScreen,
} = createDrawerNavigator<NavigatorParams>();

// FIXME(REACT-NAVIGATION-5): Not able to disable a pan gesture.
//
// In v4, it was possible with `navigationOptions: { gesturesEnabled: false }`
// Basically, I want to do this to disable `back` navigation from home screen to auth
// For Android, it can be covered with custom BackHandler.
//
// I'm not sure if it is a "true way", but I find it better
// rather than hard-coding business logic in navigators
// like it is described in https://reactnavigation.org/docs/en/next/auth-flow.html

const AppNavigator = (): React.ReactElement => (
  // @ts-ignore: `drawerContent` also contains a DrawerNavigationProp
  <DrawerNavigator drawerContent={DrawerContent}>
    {drawerRoutes.map(({ component, icon, name }, index) => (
      <DrawerScreen
        component={component}
        key={`${name}-${index}`}
        name={name as never} // FIX: type
        options={{ drawerIcon: icon, title: name }}
      />
    ))}
  </DrawerNavigator>
);

export default AppNavigator;