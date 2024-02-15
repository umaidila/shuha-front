import {Button, Text, TextInput, View} from "react-native";
import {styles} from "../styles";
import {LoginNavigationProps, RootStackParamList} from "../types";
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, useRoute} from "@react-navigation/native";
import {useState} from "react";
import {backUrl} from "../properties";
import { unknownError } from "../labelsRus";
import alert from '../alert';
import {LoginResponse} from "../dto";


const LoginScreen = (props: LoginNavigationProps) => {
    const route = useRoute();
    const initEmail = (props.route.params && props.route.params.email) ?? "";
    const initPassword = (props.route.params && props.route.params.password) ?? "";

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [emailText, setEmailText] = useState(initEmail);
    const [passwordText, setPasswordText] = useState(initPassword);


    const sendLoginRequest = async () => {
        try {
            const response = await fetch(backUrl + "login", {
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
                case 200:
                    alert("Успешный вход");
                    let tokens = await response.json() as unknown as LoginResponse
                    Variables.setAccessToken(tokens.accessToken);
                    Variables.setRefreshToken(tokens.refreshToken);
                    break;
                case 404:
                    alert("Неверные логин или пароль")
                    break;
                default:
                    alert(unknownError)
                    break;
            }
        } catch (error: any){
            alert(error);
        }
    }


    return (
        <View style={styles.container}>
            <Text style={{color: "green", fontWeight: "bold", fontSize: 30}}>Вход</Text>
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
                title="Вход"
            />
        </View>
    );
}

export default LoginScreen;