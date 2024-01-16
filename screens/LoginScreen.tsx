import {Button, Text, TextInput, View} from "react-native";
import {styles} from "../styles";
import {RootStackParamList} from "../types";
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from "@react-navigation/native";
import { useState } from "react";

const LoginScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');



    return (
        <View style={styles.container}>
      <TextInput
        style={{height: 40}}
        placeholder="Введите email"
        onChangeText={newText => setEmailText(newText)}
        defaultValue={emailText}
      />
        </View>
    );
}

export default LoginScreen;