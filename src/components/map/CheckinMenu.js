import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
// import idx from 'idx';

const CheckinMenu = ({ vendor }) => {
  const formattedAddress = 'address'; // idx(vendor, _ => _.location.formattedAddress);
  let addressArray = [];
  let lineOne;
  let lineTwo;
  formattedAddress && (addressArray = formattedAddress.split(','));
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
    <View style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <View style={styles.headerInner}>
        <Image style={styles.logo} source={vendor.logo} />
        <View style={{
          display: 'flex', flexDirection: 'column', paddingLeft: 20, paddingTop: 30
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
    height: 120,
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
    height: 30,
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


export default CheckinMenu;
