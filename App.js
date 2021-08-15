import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure(config);

export default function App() {
  return <AppNavigator />;
}
