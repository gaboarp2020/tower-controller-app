import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import AppNavigator from './app.navigator';

interface PropTypes {}

const MainNavigator = ({}: PropTypes): React.ReactElement => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default MainNavigator;