import {Button, Text, View} from "react-native";
import {styles} from "../styles";
import {RootStackParamList} from "../types";
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from "@react-navigation/native";

function WelcomeScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const navigateToRegister = () => {
        navigation.navigate("Register");
    };

    const navigateToLogin = () => {
        navigation.navigate("Login");
    }

    return (
        <View style={styles.container}>
            <Text style={{color: "red", fontWeight: "bold", fontSize: 30}}>Шуха</Text>
            <Text style={styles.title}>Впервые играете? Создайте аккаунт</Text>
            <Button
                title="Зарегистрироваться"
                onPress={navigateToRegister}
            />
            <Text style={styles.title}>Уже зарегистрированы? Войдите в аккаунт</Text>
            <Button
                title="Вход"
                onPress={navigateToLogin}
            />
        </View>
    );
}

export default WelcomeScreen;