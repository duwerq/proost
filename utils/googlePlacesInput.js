import React from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = ({select}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2}
      autoFocus
      returnKeyType={'search'}
      listViewDisplayed='auto'
      fetchDetails={true}
      renderDescription={row => row.description}
      onPress={(data, details = null) => select(data.description)}
      getDefaultValue={() => ''}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyBEwpaLgDrpUimXd8MeFlkz5pw_9fyhmng',
        language: 'en',
        types: '(cities)'
      }}
      
      styles={{
        textInputContainer: {
          borderRadius: 10,
          paddingLeft: 8,
          paddingRight: 8,
          backgroundColor: '#ffffff',
          borderWidth: 0,
          borderTopWidth: 0
        },
        textInput: {
          width: '100%',
          height: '100%',
          marginRight: 0,
          marginLeft: 0,
          marginTop: 0,
          borderWidth: 0,
          paddingLeft: 0,
          paddingRight: 0,
          borderRadius: 10,
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}
      
      currentLocation={true}
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch'
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'food'
      }}

      // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      // predefinedPlaces={[homePlace, workPlace]}

      debounce={200}
    />
  );
}

export default GooglePlacesInput;