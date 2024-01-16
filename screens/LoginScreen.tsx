import {Button, Text, TextInput, View} from "react-native";
import {styles} from "../styles";
import {LoginNavigationProps, RootStackParamList} from "../types";
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";

const LoginScreen = (props: LoginNavigationProps) => {
    const route = useRoute();
    const initEmail = (props.route.params && props.route.params.email) ?? "";
    const initPassword = (props.route.params && props.route.params.password) ?? "";

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [emailText, setEmailText] = useState(initEmail);
    const [passwordText, setPasswordText] = useState(initPassword);





    return (
         <View style={styles.container}>
            <Text style={{ color: "green", fontWeight: "bold", fontSize: 30 }}>Вход</Text>
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