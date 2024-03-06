import React from 'react';
import { ScrollView } from 'react-native';
import {Modal, StyleSheet, View} from 'react-native';
import {Abutton} from '../Abutton';

const Amodal = ({
  children,
  modalVisible,
  handleModalClose = () => {},
  close = true,
  ButtonText = 'Close',
  style = {},
  mainStyle = {}
}) => {

  return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ScrollView></ScrollView>
          <View style={[aModal.centeredView,mainStyle]}>
              <View style={[aModal.modalView, style]}>{children}</View>
              {close && (
                  <View>
                     <Abutton onPress={() => handleModalClose()}>{ButtonText}</Abutton>
                  </View>
              )}
          </View>
      </Modal>
  );
};

const aModal = StyleSheet.create({
  centeredView: {
    padding: 20,
    backgroundColor: '#000000aa',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});

export default Amodal;
