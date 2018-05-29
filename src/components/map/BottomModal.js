import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity
} from 'react-native';

const BottomModal = props => (
  <Modal visible={props.visible} transparent animationType="slide">
    <View style={styles.container} >
      <View style={styles.innerContainer}>
        <View style={styles.modalHeader}>
          <View style={styles.requestClose}>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '100%',
                borderTopRightRadius: 10,
                borderColor: '#fff',
                backgroundColor: 'rgba(0,0,0, 0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => props.closeModal()}
            >
              <Text>BUTTON</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.requestButton}>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '100%',
                borderTopRightRadius: 10,
                borderColor: '#fff',
                backgroundColor: 'rgba(0,0,0, 0)'
              }}
              onPress={() => props.confirmAction()}
            >
              <Text style={styles.requestText}>{props.buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {props.children}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '25%',
    flex: 1
  },
  innerContainer: {
    width: '80%',
    height: '35%',
    backgroundColor: '#fff',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderTopRightRadius: 10
  },
  modalHeader: {
    height: 40,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: '#94b099',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  requestClose: {
    height: 40,
    width: 60,
    borderTopLeftRadius: 10
  },
  requestButton: {
    height: 40,
    width: '40%',
    borderTopRightRadius: 10
  },
  requestText: {
    borderTopRightRadius: 10,
    textAlign: 'right',
    paddingRight: 20,
    lineHeight: 40,
    width: '100%',
    height: '100%'
  }
});


export default BottomModal;
