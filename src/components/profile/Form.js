import React, {Component} from 'react';
import {
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView,
  findNodeHandle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {FormLabel, FormInput, Button, ButtonGroup} from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';

// utils
import LoadingScreen from '../../utils/loading';
import ButtonSelections from '../../utils/buttonSelections';
import GooglePlacesInput from '../../utils/googlePlacesInput';

export default class ProfileForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
    location: '',
    loading: true,
    showGoogleAutoComplete: false
  }

  componentDidMount() {
    if (this.props.profile && !this.props.loading) {
      this.setState({...this.props.profile, loading: false})
      console.log('profile did mount', this.props)
      // this.props.navigation.navigate('MapNav')
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.props.profile !== nextProps.profile || this.state !== nextState || this.props.loading !== nextProps.loading) {
      return true;
    } else {
      return false
    }
  }
  

  componentDidUpdate(prevProps) {
    const {loading, profile} = this.props;
    
    if (loading !== prevProps.loading && loading !== this.state.loading) {
      this.setState({loading})
    }
    if (profile !== prevProps.profile && !loading) {
      console.log('did update profile', profile, prevProps.profile, loading)
      this.setState({...profile})
    }
  }
  
  inputs = {}

  _onFocus = (field) => {
    this.inputs[field].measureLayout(
      findNodeHandle(this.scrollView),
      (x, y, width, height) => {
        this.scrollView.scrollTo({ x: 0, y: y - 200, animated: true });
    });
  }

  _focusNextField = (nextField) => {
    this.inputs[nextField].focus();
  }

  updateProfile = () => {
    const { profile } = this.props;
    if (profile) {
      this.props.updateProfile({...this.state})
    } else {
      this.props.createProfile({...this.state})
    }
  }

  render() {
    const {profile} = this.props;
    const {
      firstName,
      lastName,
      birthdate,
      gender,
      location,
      loading,
      showGoogleAutoComplete
    } = this.state;
    console.log('profile props', this.props, this.state)
    if (loading && !profile) return <LoadingScreen />
    return (
      <View style={styles.formContainer}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          ref={(r) => { this.scrollView = r; }} 
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          onScrollEndDrag={() => {
            if (showGoogleAutoComplete) this.setState({showGoogleAutoComplete: false})
          }}
        >
          <View style={{flex: 1}} >
            <FormLabel>First Name</FormLabel>
              <TextInput 
                onChangeText={(firstName) => this.setState({firstName})} 
                value={firstName}
                style={styles.textInput}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => this._focusNextField('lastName')}
                ref={i => {this.inputs.firstName = i}}
                onFocus={() => this._onFocus('firstName') }
              />
            <FormLabel>Last Name</FormLabel>
            <TextInput 
              onChangeText={(lastName) => this.setState({lastName})} 
              value={lastName}
              style={styles.textInput}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {this.inputs.lastName.blur(); this.inputs.birthdate.onPressDate()}}
              ref={i => {this.inputs.lastName = i}}
              onFocus={() => this._onFocus('lastName') }
            />
            <FormLabel>Birthday</FormLabel>
            <DatePicker
              style={{width: '100%', paddingTop: 4}}
              date={birthdate}
              mode="date"
              placeholder="Select Birthday"
              format="MM/DD/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{dateIcon: styles.dateIcon, dateInput: styles.dateInput}}
              // onCloseModal={() => Keyboard.dismiss()}
              onDateChange={(birthdate) => this.setState({birthdate})}
              ref={i => {this.inputs.birthdate = i}}
            />
            <FormLabel>Gender</FormLabel>
            <ButtonSelections
              buttons={['Female', 'Male', 'Other']}
              select={(gender) => {
                this.setState({gender});
                this._focusNextField('location')
              }}
              ref={i => {this.inputs.gender = i}}
            />
            <FormLabel>Location</FormLabel>
            <TouchableOpacity
              style={[ styles.textInput, styles.locationInput, { flexGrow: showGoogleAutoComplete ? .5 : 0 } ]}
              onPress={() => {
                this.setState({showGoogleAutoComplete: true});
                this.inputs.location.measureLayout(
                  findNodeHandle(this.scrollView),
                  (x, y, width, height) => {
                    console.log('x, y', x, y)
                    this.scrollView.scrollTo({ x: 0, y: y - 40, animated: true });
                });
              }}
              ref={i => {this.inputs.location = i;}}
            >
              <View style={{borderRadius: 10}}>
              {showGoogleAutoComplete ?
                  <GooglePlacesInput 
                    select={(location) => {
                      this.setState({location, showGoogleAutoComplete: false});
                    }}
                  />
                :
                <Text>{location}</Text>
              }
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{position: 'absolute', bottom: 24, width: '100%', alignSelf: 'center' }}>
          <Button
            icon={{name: 'done' }}
            title='Submit'
            backgroundColor="#ffa500"
            containerViewStyle={styles.button}
            onPress={this.updateProfile}
          />
        </View>
      </View>  
    )
  }
};

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    position: 'relative'
  },
  scrollContainer: {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: '20%',
    flexGrow: 1,
    height: '160%'
  },
  textInput: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    // borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingLeft: 8
  },
  dateIcon: {
    position: 'absolute',
    left: 8,
    top: 4,
    marginLeft: 0
  },
  dateInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: 50,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingLeft: 48
  },
  locationInput: { 
    paddingLeft: 8,
    borderColor: 'orange',
    alignItems: 'center'
  },
  button: {
    width: '100%', 
    marginLeft: 0,
    paddingTop: 16
  
  }
})
