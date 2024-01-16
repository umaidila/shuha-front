import { Button, Text, TextInput, View } from "react-native";
import { styles } from "../styles";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import alert from '../alert'
import { backUrl } from "../properties";

const RegistrationScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');

    const sendRegisterRequest = async () => {
        const response = await fetch(backUrl + "/register", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: emailText,
                password: passwordText,
              }),
        })
        alert("Good");
    }

    return (
        <View style={styles.container}>
            <Text style={{ color: "blue", fontWeight: "bold", fontSize: 30 }}>Регистрация</Text>
            <TextInput
                style={styles.input}
                placeholder="Введите email"
                onChangeText={newText => setEmailText(newText)}
                defaultValue={emailText}
            />
            <TextInput
                style={styles.input}
                placeholder="Введите пароль"
                onChangeText={newText => setPasswordText(newText)}
                defaultValue={passwordText}
            />
            <Button
                title="Зарегистрироваться"
                onPress={sendRegisterRequest}
            />
        </View>
    );
}

export default RegistrationScreen;