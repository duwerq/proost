import React from 'react';
import {
  Platform,
  Text,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';
import Amplify, { Auth } from 'aws-amplify';
import Client from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider as Provider } from 'react-apollo';
import config from './aws-exports';
import { appSyncConfig } from './AppSync';

// components
import AuthScreen from './src/components/auth';
import Profile from './src/components/profile';
import MapContainer from './src/components/map';
import Loading from './src/utils/loading';

Amplify.configure(config);

const client = new Client({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: 'AMAZON_COGNITO_USER_POOLS',
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  }
});

const AuthStack = createStackNavigator({
  SignIn: {
    screen: AuthScreen,
    navigationOptions: () => ({
      title: 'Sign In',
      headerStyle: {
        backgroundColor: '#42a1f4'
      },
      headerTitleStyle: {
        color: '#ffffff'
      },
      headerTintColor: '#ffffff'
    }),
  },
  SignUp: {
    screen: AuthScreen,
    navigationOptions: () => ({
      title: 'Sign Up',
      headerStyle: {
        backgroundColor: '#42a1f4'
      },
      headerTitleStyle: {
        color: '#ffffff'
      },
      headerTintColor: '#ffffff'
    }),
  }
});

const ProfileNav = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation, screenProps }) => ({
      title: 'Edit Profile',
      headerLeft: (
        <Icon
          onPress={() => navigation.openDrawer()}
          name="menu"
          containerStyle={{
            paddingLeft: 16
          }}
        />
      ),
      headerStyle: {
        backgroundColor: '#42a1f4'
      },
      headerTitleStyle: {
        color: '#ffffff'
      },
      headerTintColor: '#ffffff'
    })
  }
});

const MapNav = createStackNavigator({
  MapScreen: {
    screen: MapContainer,
    navigationOptions: ({ navigation, screenProps }) => ({
      title: 'Map',
      headerLeft: (
        <Icon
          onPress={() => navigation.openDrawer()}
          name="menu"
          containerStyle={{
            paddingLeft: 16
          }}
        />
      ),
      headerStyle: {
        backgroundColor: '#42a1f4'
      },
      headerTitleStyle: {
        color: '#ffffff'
      },
      headerTintColor: '#ffffff'
    })
  }
});

const DrawerNav = createDrawerNavigator({
  Map: MapNav,
  EditProfile: ProfileNav,
  SignedOut: {
    screen: ({ navigation }) => {
      Auth.signOut().then((signout) => {
        navigation.navigate('SignIn');
      }).catch(err => console.log('err', err));
      return <Loading />;
    },
    navigationOptions: ({ navigation, screenProps }) => ({
      title: 'SignOut',
      headerStyle: {
        backgroundColor: '#42a1f4'
      },
      headerTitleStyle: {
        color: '#ffffff'
      },
      headerTintColor: '#ffffff'
    })
  }
});

const Routes = createSwitchNavigator({
  Auth: AuthStack,
  DrawerNav
  // AppNav

}, {
  initialRoute: 'SignIn'
});

const App = () => (
  <Provider client={client}>
    <Rehydrated>
      <Routes />
    </Rehydrated>
  </Provider>
);

export default App;
