import React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text } from 'react-native';

import Header from "../components/common/Header";
import { signInWithGoogleAsync } from '../components/actions/auth';


export default class LogInScreen extends React.Component<Props> {
  static navigationOptions = {
    header: () => <Header />
  };

  checkIfLoggedIn = () => {

  }

  render() {
    const { navigation } = this.props;
    return (
      <div>
        <Text>Act One</Text>
        <button
          className="button"
          onPress={signInWithGoogleAsync}
          title='Google Sign In'
          >
            Google Sign In
           </button>
      </div>
    );
  }
}
