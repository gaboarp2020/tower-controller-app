import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  // ViewStyle,
  View,
} from 'react-native';

import constants from '../../../constants';
import WifiApi from '../../api/wifi';
import {
  Button,
  Icon,
  Input,
  Screen,
  // Spinner,
} from '../../components';
import {TouchableIcon} from '../../components/Icon';
import {InputStatus} from '../../components/Input';
import {AppRoutes} from '../../navigation/routes';
import {ScreenProps} from '../../navigation/types';

const PAGE_MARGIN: number = 100;
const FORM_SIZE: number = constants.DEVICE_WIDTH - PAGE_MARGIN * 2;

// const LoadingIndicator = (props: { style?: ViewStyle }) => (
//   <View style={[props.style]}>
//     <Spinner size='small'/>
//   </View>
// );

const WifiConfigurationScreen = ({}: // navigation,
// route,
ScreenProps<AppRoutes.WIFI_CONFIGURATION>) => {
  const [ssidCaptionMessage, setSsidCaptionMessage] = useState<string>('');
  const [passwordCaptionMessage, setPasswordCaptionMessage] =
    useState<string>('');
  const [confirmPasswordCaptionMessage, setConfirmPasswordCaptionMessage] =
    useState<string>('');
  const [inputSsidStatus, setInputSsidStatus] = useState<InputStatus>();
  const [inputPasswordStatus, setInputPasswordStatus] = useState<InputStatus>();
  const [inputConfirmPasswordStatus, setInputConfirmPasswordStatus] =
    useState<InputStatus>();
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
  const [ssidValue, setSsidValue] = useState<string>('');
  // const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setConfirmPasswordCaptionMessage('');
    setInputSsidStatus(undefined);
    setInputPasswordStatus(undefined);
    setInputConfirmPasswordStatus(undefined);
    setPasswordValue('');
    setConfirmPasswordValue('');
    setSsidValue('');
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
    if (inputPasswordStatus !== undefined) {
      resetInput();
    }
  };

  const handleConfirmPasswordChange = (nextValue: string) => {
    setConfirmPasswordValue(nextValue);
    if (inputConfirmPasswordStatus !== undefined) {
      resetInput();
    }
  };

  const handleSsidChange = (nextValue: string) => {
    setSsidValue(nextValue);
    if (inputSsidStatus !== undefined) {
      resetInput();
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (ssidValue.length === 0) {
      updateInput({
        captionText: 'Wrong password',
        status: 'danger',
        setCaptionMessage: setSsidCaptionMessage,
        setInputStatus: setInputSsidStatus,
      });

      return;
    }

    if (passwordValue.length === 0) {
      updateInput({
        captionText: 'Wrong password',
        status: 'danger',
        setCaptionMessage: setPasswordCaptionMessage,
        setInputStatus: setInputPasswordStatus,
      });

      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      updateInput({
        captionText: 'Wrong password',
        status: 'danger',
        setCaptionMessage: setConfirmPasswordCaptionMessage,
        setInputStatus: setInputConfirmPasswordStatus,
      });

      return;
    }

    try {
      await WifiApi.set(ssidValue, passwordValue);
    } catch (error) {
      updateInput({
        captionText: 'Wrong password',
        status: 'danger',
        setCaptionMessage: setPasswordCaptionMessage,
        setInputStatus: setInputPasswordStatus,
      });
    }
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
              placeholder="Ingrese una nueva contraseña"
              secureTextEntry={secureTextEntry}
              status={inputPasswordStatus}
              style={styles.input}
              value={passwordValue}
            />
            <Input
              accessoryRight={eyeIcon}
              caption={confirmPasswordCaptionMessage}
              label="Confirmar Contraseña"
              onChangeText={handleConfirmPasswordChange}
              placeholder="Repita la contraseña"
              secureTextEntry={secureTextEntry}
              status={inputConfirmPasswordStatus}
              style={styles.input}
              value={confirmPasswordValue}
            />
          </View>

          <View>
            <TouchableWithoutFeedback onPress={handleSubmit}>
              <Button
                // accessoryLeft={isLoading ? LoadingIndicator : undefined}
                appearance="outline"
                style={styles.button}
                onPress={handleSubmit}>
                SAVE
              </Button>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleCancel}>
              <Button
                // accessoryLeft={isLoading ? LoadingIndicator : undefined}
                status="basic"
                appearance="outline"
                style={styles.button}
                onPress={handleCancel}>
                RESET
              </Button>
            </TouchableWithoutFeedback>
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
