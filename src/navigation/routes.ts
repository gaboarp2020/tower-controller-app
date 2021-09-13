import { ComponentType } from 'react';

import { Icon } from '../components';

import HomeScreen from '../screens/Home';
import TowerControlScreen from '../screens/TowerControl';
import WifiConfigurationScreen from '../screens/WifiConfiguration';

export enum AppRoutes {
  HOME = 'Inicio',
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

const HOME: NavigationRoute = {
  component: HomeScreen,
  icon: Icon.Home,
  name: AppRoutes.HOME,
};

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

export const drawerRoutes: NavigationRoute[] = [HOME, TOWER_CONTROL, WIFI_CONFIGURATION];

export default AppRoutes;