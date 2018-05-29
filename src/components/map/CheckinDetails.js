import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
// import idx from 'idx';

const CheckinDetails = (props) => {
  const { vendor } = props;
  const addressArray = vendor.location.formattedAddress.split(',');
  let lineOne;
  let lineTwo;
  
  addressArray.forEach((line, i) => {
    if (line) {
      if (i === 0) {
        lineOne = line;
      } else if (i === 1) {
        lineTwo = line;
      } else if (i === 2) {
        lineTwo += `,${line}`;
      }
    }
  });
  
  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <View style={styles.headerInner}>
        {props.preloadedImage}
        <Image style={styles.logo} source={vendor.logo} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 20,
            height: '100%'
          }}
        >
          <Text style={{ fontSize: 26 }}>{vendor.name}</Text>
          {lineOne && <Text style={{ fontSize: 16, paddingTop: 10 }}>{lineOne}</Text>}
          {lineTwo && <Text style={{ fontSize: 16, paddingTop: 5 }}>{lineTwo}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  details: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 80,
    paddingTop: 10
  },
  name: {
    color: 'black',
    fontSize: 26
  },
  logoContainer: {
    flex: 1
  },
  logo: {
    alignSelf: 'center',
    width: '45%',
    maxHeight: '100%',
    resizeMode: 'contain'
  }
});

export default CheckinDetails;
