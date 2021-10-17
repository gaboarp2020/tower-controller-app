import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

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

const TowerControlScreen = ({}: ScreenProps<AppRoutes.TOWER_CONTROL>) => {
  const [isModalVisible, setModalVisibility] = useState<boolean>(true);
  const [hasConnectionInterrupt, setConnectionInterrupt] = useState<boolean>(false);
  const [isReconnecting, setReconnecting] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  checkHardwareApi.get().then((isSucceed) => {
    if (!isSucceed) {
      setConnectionInterrupt(true);
    }
    setLoading(false);
  });

  const handleCancel = () => {
    setModalVisibility(false);
  }
  
  const handleSubmit = async () => {
    setReconnecting(true)
    await checkHardwareApi.get().then((isSucceed) => {
      if (isSucceed) {
        setConnectionInterrupt(false);
      } else {
        toastNotification('No se pudo reestablecer la conexión', {duration: 3000});
      }
    });
    setModalVisibility(false);
    setReconnecting(false);
  }

  return (
    <Screen>
      {isLoading && (
        <View style={styles.container}>
          <Spinner animating size="giant" status="info" />
        </View>              
      )}
      {!isLoading && (
        <Screen.Container>
          {hasConnectionInterrupt && isModalVisible && (
            <Modal
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            visible={isModalVisible}
            >
              <Text style={styles.marginBottom}>Se ha interrumpido la conexión. ¿Deséa volver a conectarse?</Text>
              {isReconnecting && (
                  <View style={styles.container}>
                    <Spinner animating size="large" status="info" />
                  </View>              
                )
              }
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
        </Screen.Container>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
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
