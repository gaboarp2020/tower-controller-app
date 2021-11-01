import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useRecoilState} from 'recoil';

import {
  ActionButtonGroup,
  ActionMessage,
  Button,
  Modal,
  Screen,
  Spinner,
  Text,
  Timer,
} from '../../components';
import {AppRoutes} from '../../navigation/routes';
import {ScreenProps} from '../../navigation/types';
import checkHardwareApi from '../../api/checkHardware';
import toastNotification from '../../helpers/toast-notification';
import {
  connectionInterruptState,
  isConnectingState,
  isStopwatchStartState,
  resetStopwatchState
} from '../../components/ActionButtonGroup';

const TowerControlScreen = ({}: ScreenProps<AppRoutes.TOWER_CONTROL>) => {
  const [isModalVisible, setModalVisibility] = useState<boolean>(true);
  const [isReconnecting, setReconnecting] = useState<boolean>(false);
  // eslint-disable @typescript-eslint/no-unused-vars
  const [hasConnectionInterrupt, setConnectionInterrupt] = useRecoilState(connectionInterruptState);
  // eslint-disable @typescript-eslint/no-unused-vars
  const [isLoading, setIsConnecting] = useRecoilState(isConnectingState);
  // eslint-disable @typescript-eslint/no-unused-vars
  const [_, setIsStopwatchStart] = useRecoilState(isStopwatchStartState);
  // eslint-disable @typescript-eslint/no-unused-vars
  const [___, setResetStopwatch] = useRecoilState(resetStopwatchState);

  checkHardwareApi.get().then((isSucceed) => {
    if (!isSucceed) {
      setConnectionInterrupt(true);
    }
    setIsConnecting(false);
  });

  const handleCancel = () => {
    setModalVisibility(false);
  }
  
  const handleSubmit = async () => {
    setReconnecting(true)
    await checkHardwareApi.get().then((isSucceed) => {
      if (isSucceed) {
        setConnectionInterrupt(false);
        setIsStopwatchStart(false);
        setResetStopwatch(true);
      } else {
        toastNotification('No se pudo reestablecer la conexión', {duration: 5000});
      }
    });
    setModalVisibility(false);
    setReconnecting(false);
  }

  return (
    <Screen>
      <Screen.Container>
        {isLoading && (
          <View style={styles.container}>
            <Spinner animating size="giant" status="info" />
          </View>              
        )}
        {!isLoading && (
          <>
            {isReconnecting && (
                <View style={styles.container}>
                  <Spinner animating size="large" status="info" />
                </View>              
              )
            }
            {!isReconnecting && hasConnectionInterrupt && isModalVisible && (
              <Modal
              onCancel={handleCancel}
              onSubmit={handleSubmit}
              visible={isModalVisible}
              >
                <Text style={styles.marginBottom}>Se ha interrumpido la conexión. ¿Deséa volver a conectarse?</Text>
              </Modal>
            )}
            {hasConnectionInterrupt && !isModalVisible && (
              <View style={styles.interruptedContainer}>
                <Text align="center" style={styles.marginBottom}>Conexión interrumpida</Text>
                <Button
                  onPress={() => setModalVisibility(true)}
                  >
                  Verificar conexión
                </Button>
              </View>
            )}
            {!hasConnectionInterrupt && (
              <View style={styles.container}>
                <Timer />
                <ActionButtonGroup />
                <ActionMessage />
              </View>
            )}
          </>
        )}
      </Screen.Container>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  interruptedContainer: {
    width: 260,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  marginBottom: {
    marginBottom: 40
  }
});

export default TowerControlScreen;
