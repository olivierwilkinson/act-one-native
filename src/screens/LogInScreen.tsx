import React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";

import Header from "../components/common/Header";
import { startLogIn } from '../components/actions/auth';


export default class LogInScreen extends React.Component<Props> {
  static navigationOptions = {
    header: () => <Header />
  };

  render() {
    const { navigation } = this.props;
    return (
      <div>
        <h1>Act One</h1>
        <button className="button" onClick={startLogIn}>Log In</button>
      </div>
    );
  }
}
