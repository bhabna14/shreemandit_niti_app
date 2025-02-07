import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// SplashScreen
import SplashScreen from './src/Screens/SplashScreen/Index'

// AUth
import Login from './src/Screens/Auth/Login'
import OtpVerify from './src/Screens/Auth/OtpVerify'

// Pages
import Home from './src/Screens/Home/Index'
import ManualNitiPage from './src/Screens/ManualNitiPage/Index'

const Stack = createNativeStackNavigator()

export const base_url = "http://panji.mandirparikrama.com/"

const App = () => {

  const [showSplash, setShowSplash] = useState(true);
  const [access_token, setAccess_token] = useState("");

  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('storeAccesstoken');
      setAccess_token(token || "");
    } catch (error) {
      console.error('Failed to retrieve access token:', error);
    }
  };

  useEffect(() => {
    getAccessToken();
    setTimeout(() => {
      setShowSplash(false);
    }, 5000)
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#B7070A" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} />) : null}
        {access_token ? <Stack.Screen name="ManualNitiPage" component={ManualNitiPage} /> : <Stack.Screen name="Login" component={Login} />}
        {!access_token ? <Stack.Screen name="ManualNitiPage" component={ManualNitiPage} /> : <Stack.Screen name="Login" component={Login} />}
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="ManualNitiPage" component={ManualNitiPage} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})