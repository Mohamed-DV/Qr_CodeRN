import React from "react";
import Scanner from "./screens/scanner";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GeneretQrCode from "./screens/generateQrCode";
const Stack = createStackNavigator();
function App(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="generetQrCode" component={GeneretQrCode}/>
      </Stack.Navigator>
  )
}
export default ()=>{
  return(
    <NavigationContainer>
    <App/>
    </NavigationContainer>
  )
}