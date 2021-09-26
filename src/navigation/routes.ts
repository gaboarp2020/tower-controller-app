import {ComponentType} from 'react';

import {Icon} from '../components';

import TowerControlScreen from '../screens/TowerControl';
import WifiConfigurationScreen from '../screens/WifiConfiguration';

export enum AppRoutes {
  TOWER_CONTROL = 'Control de la Torre',
  WIFI_CONFIGURATION = 'Configurar Wifi',
}

type Component = ComponentType<any>;

interface NavigationRoute {
  component: Component;
  icon?: any; // FIX
  name: AppRoutes;
}

// ROUTES

const TOWER_CONTROL: NavigationRoute = {
  component: TowerControlScreen,
  icon: Icon.Move,
  name: AppRoutes.TOWER_CONTROL,
};

const WIFI_CONFIGURATION: NavigationRoute = {
  component: WifiConfigurationScreen,
  icon: Icon.Wifi,
  name: AppRoutes.WIFI_CONFIGURATION,
};

export const drawerRoutes: NavigationRoute[] = [
  TOWER_CONTROL,
  WIFI_CONFIGURATION,
];

export default AppRoutes;
