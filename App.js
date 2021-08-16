import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
// Amplify.configure(config);

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const App = () => {
  return <AppNavigator />;
};

export default withAuthenticator(App);
