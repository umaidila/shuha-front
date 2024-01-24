import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {styles} from './styles';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from "./screens/WelcomeScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import {RootStackParamList} from './types';
import LoginScreen from "./screens/LoginScreen";
import {RecoilRoot} from "recoil";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <>
            <RecoilRoot>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Welcome">
                        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                        <Stack.Screen name="Register" component={RegistrationScreen}/>
                        <Stack.Screen name="Login" component={LoginScreen}/>
                    </Stack.Navigator>
                </NavigationContainer><StatusBar style="auto"/>
            </RecoilRoot>
        </>
    );
}

