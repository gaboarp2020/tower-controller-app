import {
  Divider,
  Drawer,
  DrawerElement,
  DrawerItem,
  DrawerItemElement,
  IndexPath,
} from '@ui-kitten/components';
import React from 'react';
import {ImageProps, StyleSheet} from 'react-native';

import {Text} from '../components';
import {RenderProp} from '../components/types';
import AppInfoService from '../services/info';
import AppRoutes from './routes';
import {NavigationRoute, ScreenProps} from './types';

interface DrawerItemTitleProps {
  route: NavigationRoute;
}

const DrawerItemTitle = ({route}: DrawerItemTitleProps) => (
  <Text appearance="hint" category="h5" color="#FFF">
    {route.name}
  </Text>
);

const DrawerContent = (props: ScreenProps<AppRoutes>): DrawerElement => {
  const onItemSelect = (index: IndexPath): void => {
    const selectedTabRoute: string = props.state.routeNames[index.row];
    props.navigation.navigate(selectedTabRoute);
    props.navigation.closeDrawer();
  };

  const createDrawerItemForRoute = (
    route: NavigationRoute,
    index: number,
  ): DrawerItemElement => {
    const {options} = props.descriptors[route.key];

    const historyRoutes = props.state.history.filter(h => h.type === 'route');
    const lastRoute = historyRoutes[historyRoutes.length - 1] || {};

    return (
      <DrawerItem
        accessoryLeft={options.drawerIcon as RenderProp<Partial<ImageProps>>}
        key={index}
        selected={route.key === (lastRoute as any).key}
        style={[styles.item]}
        title={() => <DrawerItemTitle route={route} />}
      />
    );
  };

  return (
    <Drawer
      footer={() => (
        <>
          <Divider />
          <DrawerItem
            disabled={true}
            title={`Version ${AppInfoService.getVersion()}`}
          />
        </>
      )}
      onSelect={onItemSelect}>
      {props.state.routes.map(createDrawerItemForRoute)}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  item: {
    minHeight: 60,
  },
});

export default DrawerContent;
