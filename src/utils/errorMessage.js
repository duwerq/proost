import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

const ErrorMessage = ({ error }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{error}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 24,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: '#fff',
    paddingLeft: 8,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    color: 'red',
    fontWeight: 'bold'
  }
});

export default ErrorMessage;
