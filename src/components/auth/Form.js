import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
  ScrollView,
  findNodeHandle
} from 'react-native';
import { FormLabel, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

// component
import LoadingScreen from '../../utils/loading';
import ErrorMessage from '../../utils/errorMessage';

export default class AuthScreen extends Component {
  state = {
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    username: '',
    loading: true,
    authCode: '',
    showAuthCode: false,
    error: null
  }

  componentDidMount() {
    Auth.currentSession()
      .then((user) => {
        if (this.props.user.profile) {
          this.props.navigatation.navigate('Map');
        } else {
          this.props.navigation.navigate('EditProfile');
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  componentDidUpdate(prevProps) {
    const { loading, user } = this.props;
    if (loading !== prevProps.loading && loading !== this.state.loading) {
      this.setState({ loading });
    }
  }


  onChangeInput = (key, value) => {
    this.setState({ [key]: value, error: null });
  }

  confirmUser = async () => {
    const { username, authCode, password } = this.state;
    const userConfirmed = await Auth.confirmSignUp(username, authCode);
    const userSignedIn = await Auth.signIn(username, password);
    const userAuthSession = await Auth.currentSession();

    if (userAuthSession) {
      this.props.createUser();
      this.props.navigation.navigate('Profile');
    }
  }

  focusNextField = (nextField) => {
    this.inputs[nextField].focus();
  }

  formatErrorMessage = error => error.message || error;

  inputs = {}

  _onFocus = (field, scrollValue = 0) => {
    this.inputs[field].measureLayout(
      findNodeHandle(this.scrollView),
      (x, y, width, height) => {
        this.scrollView.scrollTo({ x: 0, y: y - (200 + scrollValue), animated: true });
      });
  }

  resendAuthCode = (username) => {
    this.setState({ error: false });
    Auth.resendSignUp(username)
      .then(() => {
        this.setState({ loading: false, authCode: '' });
      })
      .catch((err) => {
        this.setState({ loading: false, error: this.formatErrorMessage(err) });
      });
  }

  signIn = (username, password) => {
    Auth.signIn(username, password)
      .then((res) => {
        this.props.navigation.navigate('Profile');
      })
      .catch((error) => {
        this.setState({ error: this.formatErrorMessage(error), loading: false });
      });
  }

  signUp = (username, password, email, phoneNumber) => {
    Auth.signUp({
      username,
      password,
      phoneNumber,
      attributes: { email, phone_number: `+${phoneNumber}` }
    }).then((user) => {
      this.setState({ showAuthCode: true, loading: false });
    })
      .catch((error) => {
        if (error.code === 'UsernameExistsException') {
          this.setState({
            showAuthCode: true,
            error: this.formatErrorMessage(error),
            loading: false
          });
        } else {
          this.setState({
            error: this.formatErrorMessage(error),
            loading: false
          });
        }
      });
  }

  submitAction = () => {
    const { navigation } = this.props;
    const { routeName } = navigation.state;
    const {
      email, password, username, phoneNumber, showAuthCode, error
    } = this.state;

    this.setState({ loading: true });
    if (showAuthCode) {
      if (error) {
        this.resendAuthCode(username);
      } else {
        this.confirmUser();
      }
    } else if (routeName === 'SignIn') {
      this.signIn(username, password);
    } else if (routeName === 'SignUp') {
      this.signUp(username, password, email, phoneNumber);
    }
  }

  render() {
    const { navigation } = this.props;
    const { routeName } = navigation.state;
    const {
      email,
      password,
      confirmPassword,
      username,
      phoneNumber,
      loading,
      showAuthCode,
      authCode,
      error
    } = this.state;
    const isRouteSignUp = routeName === 'SignUp';
    let submitButtonText = 'Submit';
    if (showAuthCode && error) {
      submitButtonText = 'Get New Auth Code';
    } else if (showAuthCode) {
      submitButtonText = 'Confirm Sign Up';
    }

    if (loading) return <LoadingScreen />;
    return (
      <View style={styles.authContainer}>
        {error &&
          <ErrorMessage
            error={error}
          />
        }
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          ref={(r) => { this.scrollView = r; }}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        >
          <View style={{ flex: 1 }} >
            {!showAuthCode &&
              <React.Fragment>
                <FormLabel>Username</FormLabel>
                <TextInput
                  onChangeText={username => this.onChangeInput('username', username.toLocaleLowerCase().trim())}
                  value={username}
                  style={styles.authInput}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    const nextField = isRouteSignUp ? 'phoneNumber' : 'password';
                    this.focusNextField(nextField);
                  }}
                  ref={(i) => { this.inputs.username = i; }}
                  onFocus={() => { if (!isRouteSignUp) this._onFocus('username', -65); }}
                />
                {isRouteSignUp &&
                  <React.Fragment>
                    <FormLabel>Phone Number</FormLabel>
                    <TextInput
                      onChangeText={phoneNumber => this.onChangeInput('phoneNumber', phoneNumber.trim())}
                      value={phoneNumber}
                      style={styles.authInput}
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => this.focusNextField('password')}
                      ref={(i) => { this.inputs.phoneNumber = i; }}
                    />
                  </React.Fragment>
                }
                <FormLabel>Password</FormLabel>
                <TextInput
                  onChangeText={password => this.onChangeInput('password', password.trim())}
                  value={password}
                  secureTextEntry
                  style={styles.authInput}
                  keyboardType="default"
                  returnKeyType="default"
                  onSubmitEditing={this.submitAction}
                  blurOnSubmit
                  ref={(i) => { this.inputs.password = i; }}
                />
              </React.Fragment>
            }
            {/* {isRouteSignUp &&
              <React.Fragment>
                <FormLabel>Password Confirmation</FormLabel>
                <TextInput
                  onChangeText={confirmPassword => this.onChangeInput('confirmPassword', confirmPassword)}
                  value={confirmPassword}
                  secureTextEntry
                  style={styles.authInput}
                />
              </React.Fragment>
            } */}
            {showAuthCode && !error &&
              <React.Fragment>
                <FormLabel>Auth Code</FormLabel>
                <TextInput
                  onChangeText={authCode => this.onChangeInput('authCode', authCode.trim())}
                  value={authCode}
                  style={styles.authInput}
                  blurOnSubmit
                  onSubmitEditing={this.submitAction}
                  ref={(i) => { this.inputs.authCode = i; }}
                  onFocus={() => { if (!isRouteSignUp) this._onFocus('authCode'); }}
                />
              </React.Fragment>
            }
            <Button
              icon={{ name: 'done' }}
              title={submitButtonText}
              backgroundColor="#ffa500"
              containerViewStyle={styles.button}
              onPress={this.submitAction}
            />
            {routeName === 'SignIn' &&
              <View style={styles.signInButton}>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={{ fontSize: 16 }}>Create Account</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  authContainer: {
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
    height: '100%'
  },
  authInput: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderWidth: 2,
    backgroundColor: '#fff',
    paddingLeft: 8
  },
  button: {
    width: '100%',
    marginLeft: 0,
    paddingTop: 16
  },
  signInButton: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50
  }
});
