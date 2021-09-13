import React, { useState } from 'react';
import {
  ColorValue,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import constants from '../../../constants';
import {
  Button,
  Icon,
  Input,
  Screen,
  Spinner,
  Text,
} from '../../components';
import { TouchableIcon } from '../../components/Icon';
import { InputStatus } from '../../components/Input';
import { AppRoutes } from '../../navigation/routes';
import { ScreenProps } from '../../navigation/types';

const PAGE_MARGIN: number = 100;
const FORM_SIZE: number = constants.DEVICE_WIDTH - PAGE_MARGIN * 2;

const WifiConfigurationScreen = ({
  navigation,
  route,
}: ScreenProps<AppRoutes.WIFI_CONFIGURATION>) => {

  const [captionMessage, setCaptionMessage] = useState<string>('');
  const [inputStatus, setInputStatus] = useState<InputStatus>();
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [ssidValue, setSsidValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const eyeIcon = () => (
    <TouchableIcon onPress={toggleSecureEntry}>
      {secureTextEntry ? <Icon.EyeOff /> : <Icon.Eye />}
    </TouchableIcon>
  );

  const resetInput = () => {
    setCaptionMessage('');
    setInputStatus(undefined);
  };

  const updateInput = ({
    captionText,
    status = undefined,
  }: {
    captionText: string;
    status?: InputStatus;
  }) => {
    setCaptionMessage(captionText);
    setInputStatus(status);
  };

  const handleCancel = () => {
    resetInput();
  };

  const handlePasswordChange = (nextValue: string) => {
    setPasswordValue(nextValue);
    if (inputStatus !== undefined) {
      resetInput();
    }
  };

  const handleSsidChange = (nextValue: string) => {
    setSsidValue(nextValue);
    if (inputStatus !== undefined) {
      resetInput();
    }
  };

  const handleSubmit = (type) => async () => {
    if (ssidValue.length > 0 && passwordValue.length > 0) {
      try {
        // await OffsetApi.set(passwordValue, type);

      } catch (error) {
        updateInput({
          captionText: 'Wrong password',
          status: 'danger',
        });
      }
    } else {
      updateInput({
        captionText: 'The password is required',
        status: 'danger',
      });
    }
  };

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size='small'/>
    </View>
  );

  return (
    <Screen>
      <Screen.Container>
        <View style={styles.container}>
          <Input
            caption={captionMessage}
            label="SSID"
            onChangeText={handleSsidChange}
            placeholder="Enter a new SSID"
            status={inputStatus}
            style={styles.input}
            value={ssidValue}
          />
          <Input
            accessoryRight={eyeIcon}
            caption={captionMessage}
            label="Password"
            onChangeText={handlePasswordChange}
            placeholder="Enter a new password"
            secureTextEntry={secureTextEntry}
            status={inputStatus}
            style={styles.input}
            value={passwordValue}
          />
          <Input
            accessoryRight={eyeIcon}
            caption={captionMessage}
            label="Confirm Password"
            onChangeText={handlePasswordChange}
            placeholder="Confirm the new password"
            secureTextEntry={secureTextEntry}
            status={inputStatus}
            style={styles.input}
            value={passwordValue}
          />
          <TouchableWithoutFeedback
            onPress={handleSubmit('slave')}
          >
            <Button
              accessoryLeft={isLoading && LoadingIndicator}
              appearance='outline'
              style={styles.button}
              onPress={handleSubmit}
              >
                SAVE
            </Button>
          </TouchableWithoutFeedback>
        </View>
      </Screen.Container>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 2,
  },
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    width: FORM_SIZE/2,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
  },
});

export default WifiConfigurationScreen;