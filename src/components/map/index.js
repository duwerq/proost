import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
// import {connect} from 'react-redux';
// import SwipeCards from 'react-native-swipe-cards';


// components
import BottomModal from './BottomModal';
// import CheckinMenu from './CheckinMenu';
import CheckinDetails from './CheckinDetails';

// constants
import foxBarMock from '../../constants/mockData';
const vendors = [foxBarMock];
class MapContainer extends React.Component {
  state = {
    modalOpen: false,
    showConfirm: false
  }

  confirmAction = () => {
    this.props.navigation.navigate('Cart');
    this.setState({ modalOpen: false, showConfirm: true });
  }

  render() {
    const { navigation } = this.props;
    const { modalOpen, showConfirm } = this.state;

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 41.88376239999999,
          longitude: -87.64840149999999,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // onRegionChange={(e) => console.log(}
      >
        {// showConfirm && !modalOpen &&
        // <SwipeConfirm />
        }

        {vendors.map(vendor => (
          <Marker
            coordinate={{
              latitude: 41.88376239999999,
              longitude: -87.64840149999999
            }}
            title={vendor.name}
            description={vendor.location.streetAddress}
            key={vendor.id}
          >
            <View
              style={{
                backgroundColor: 'rgb(170, 170, 170)',
                height: 20,
                width: 20,
                borderRadius: 10
              }}
            >
              <BottomModal
                visible={modalOpen}
                closeModal={() => this.setState({ modalOpen: false, showConfirm: false })}
                confirmAction={this.confirmAction}
                buttonText="Check In"
              >
                <CheckinDetails vendor={vendor} />
              </BottomModal>
            </View>
            <Callout
              onPress={() => this.setState({ modalOpen: true, showConfirm: false })}
              style={{
                minWidth: 100,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Text style={{ fontSize: 16 }}>{vendor.name}</Text>
              <Text style={{ paddingTop: 5 }}>{vendor.location.streetAddress}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    );
  }
}


export default MapContainer;
