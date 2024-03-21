import { Button, Text, TextInput, View } from "react-native";
import { styles } from "../styles";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import alert from '../alert'
import { backUrl } from "../properties";
import { loginSuccess, userAlreadyExists, unknownError } from "../labelsRus";

function RegistrationScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');

    const navigateToLogin = () => {
        navigation.navigate("Login", {
            email: emailText,
            password: passwordText
        });
    }

    const sendRegisterRequest = async () => {
        try {
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
            switch (response.status) {
                case 201:
                    alert(loginSuccess);
                    navigateToLogin();
                    break;
                case 409:
                    alert(userAlreadyExists);
                    break;
                default:
                    alert(unknownError);
                    break;
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any){
            alert(error);
        }
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