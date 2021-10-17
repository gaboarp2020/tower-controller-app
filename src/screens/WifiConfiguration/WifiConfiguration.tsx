import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import constants from '../../../constants';
import WifiApi from '../../api/wifi';
import {
  Button,
  Icon,
  Input,
  Screen,
  Spinner,
} from '../../components';
import {TouchableIcon} from '../../components/Icon';
import {InputStatus} from '../../components/Input';
import {AppRoutes} from '../../navigation/routes';
import {ScreenProps} from '../../navigation/types';
import toastNotification from '../../helpers/toast-notification';

const PAGE_MARGIN: number = 100;
const FORM_SIZE: number = constants.DEVICE_WIDTH - PAGE_MARGIN * 2;

const WifiConfigurationScreen = ({}: ScreenProps<AppRoutes.WIFI_CONFIGURATION>) => {
  const [ssidCaptionMessage, setSsidCaptionMessage] = useState<string>('');
  const [passwordCaptionMessage, setPasswordCaptionMessage] =
    useState<string>('');
  const [inputSsidStatus, setInputSsidStatus] = useState<InputStatus>();
  const [inputPasswordStatus, setInputPasswordStatus] = useState<InputStatus>();
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [ssidValue, setSsidValue] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const eyeIcon = () => (
    <TouchableIcon onPress={toggleSecureEntry}>
      {secureTextEntry ? <Icon.EyeOff /> : <Icon.Eye />}
    </TouchableIcon>
  );

  const resetInput = () => {
    setSsidCaptionMessage('');
    setPasswordCaptionMessage('');
    setInputSsidStatus(undefined);
    setInputPasswordStatus(undefined);
    setPasswordValue('');
    setSsidValue('');
  };

  const resetSsidInput = () => {
    setSsidCaptionMessage('');
    setInputSsidStatus(undefined);
    setSsidValue('');
  };

  const resetPasswordInput = () => {
    setPasswordCaptionMessage('');
    setInputPasswordStatus(undefined);
    setPasswordValue('');
  };

  const updateInput = ({
    captionText,
    status = undefined,
    setCaptionMessage,
    setInputStatus,
  }: {
    captionText: string;
    status?: InputStatus;
    setCaptionMessage: (captionText: string) => void;
    setInputStatus: (status?: any) => void; // FIX
  }) => {
    setCaptionMessage(captionText);
    setInputStatus(status);
  };

  const handleCancel = () => {
    resetInput();
  };

  const handlePasswordChange = (nextValue: string) => {
    setPasswordValue(nextValue);
  };

  const handleSsidChange = (nextValue: string) => {
    setSsidValue(nextValue);
  };

  const validateSsidInput = () => {
    if (inputSsidStatus !== undefined) {
      resetSsidInput();
    }
  }

  const validatePasswordInput = () => {
    if (inputPasswordStatus !== undefined) {
      resetPasswordInput();
    }
  }

  const handleSubmit = async (): Promise<void> => {
    if (ssidValue.length === 0) {
      updateInput({
        captionText: 'Debe agregar el SSID',
        status: 'danger',
        setCaptionMessage: setSsidCaptionMessage,
        setInputStatus: setInputSsidStatus,
      });

      return;
    }

    if (passwordValue.length === 0) {
      updateInput({
        captionText: 'Debe agregar una contraseña',
        status: 'danger',
        setCaptionMessage: setPasswordCaptionMessage,
        setInputStatus: setInputPasswordStatus,
      });

      return;
    }

    setLoading(true);
    await WifiApi.set(ssidValue, passwordValue).then((isSucceed) => {
      if (isSucceed) {
        toastNotification('¡Credenciales actualizadas!', {duration: 3000});
      } else {
        toastNotification('Error al actualizar las creedenciales', {duration: 3000});
      }
    });
    setLoading(false);
  };

  return (
    <Screen>
      <Screen.Container>
        <View style={styles.container}>
          <View>
            <Input
              caption={ssidCaptionMessage}
              label="SSID"
              onChangeText={handleSsidChange}
              onFocus={validateSsidInput}
              placeholder="Ingrese un nuevo SSID"
              status={inputSsidStatus}
              style={styles.input}
              value={ssidValue}
            />
            <Input
              accessoryRight={eyeIcon}
              caption={passwordCaptionMessage}
              label="Contraseña"
              onChangeText={handlePasswordChange}
              onFocus={validatePasswordInput}
              placeholder="Ingrese una nueva contraseña"
              secureTextEntry={secureTextEntry}
              status={inputPasswordStatus}
              style={styles.input}
              value={passwordValue}
            />
          </View>

          <View>
            {isLoading &&  <Spinner animating size="giant" status="info" />}
            {!isLoading && (
              <>
                <TouchableWithoutFeedback onPress={handleSubmit}>
                  <Button
                    appearance="outline"
                    style={styles.button}
                    onPress={handleSubmit}>
                    SAVE
                  </Button>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleCancel}>
                  <Button
                    status="basic"
                    appearance="outline"
                    style={styles.button}
                    onPress={handleCancel}>
                    RESET
                  </Button>
                </TouchableWithoutFeedback>
              </>
            )}
          </View>
        </View>
      </Screen.Container>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    width: FORM_SIZE / 2,
    marginTop: 18,
  },
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  input: {
    marginBottom: 20,
  },
});

export default WifiConfigurationScreen;
