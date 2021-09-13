import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import {
    Screen,
} from '../../components';
import { AppRoutes } from '../../navigation/routes';
import { ScreenProps } from '../../navigation/types';

const HomeScreen = ({
    navigation,
    route,
}: ScreenProps<AppRoutes.HOME>) => {

    return (
        <Screen>
            <Screen.Container>
                <View>
                </View>
            </Screen.Container>
        </Screen>
    );
};

const styles = StyleSheet.create({
});

export default HomeScreen;