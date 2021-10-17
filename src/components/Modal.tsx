import { Modal } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import constants from '../../constants';

import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Divider from './Divider';
import Icon, { TouchableIcon } from './Icon';

interface PropTypes {
  children: React.ReactNode;
  onCancel: () => void;
  onSubmit: () => void;
  visible: boolean;
}

interface ContainerPropTypes extends Omit<PropTypes, 'visible'> {
  cancelText?: string;
  submitText?: string;
}

const CustomModal = ({ children, onCancel, onSubmit, visible }: PropTypes) => (
  <Modal
    backdropStyle={[styles.backdrop]}
    onBackdropPress={onCancel}
    visible={visible}
  >
    <CustomModal.Container onCancel={onCancel} onSubmit={onSubmit}>
      {children}
    </CustomModal.Container>
  </Modal>
);

CustomModal.Container = ({
  cancelText = 'Cancelar',
  children,
  onCancel,
  onSubmit,
  submitText = 'Si',
}: ContainerPropTypes) => (
  <View style={styles.modalContainer}>
    <TouchableIcon onPress={onCancel}>
      <Icon.Close style={[styles.icon]} />
    </TouchableIcon>
    <View style={[styles.content]}>{children}</View>
    <Divider />
    <ButtonGroup>
      <Button appearance="ghost" onPress={onCancel} style={[styles.button]}>
        {cancelText}
      </Button>
      <Button appearance="ghost" onPress={onSubmit} style={[styles.button]}>
        {submitText}
      </Button>
    </ButtonGroup>
  </View>
);

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    marginHorizontal: 10,
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  icon: {
    margin: 5,
    marginLeft: 'auto',
  },
  modalContainer: {
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    padding: 0,
    position: 'relative',
    width: constants.DEVICE_WIDTH - 40,
  },
});

export default CustomModal;
