import {Text, View} from "react-native";
import { styles } from "../styles";
import {useEffect, useState} from "react";
import {getLobbyList} from "../utils";

const LobbyScreen = () => {

    const [lobbyList, setLobbyList] = useState(null);

    useEffect(  () => {
        const lobbyListFromResponse =  getLobbyList().then(
            lobbyListFromResponse => {
                setLobbyList(lobbyListFromResponse);
            }
        );
    }, [])


    return (
        <View style={styles.container}>
            <Text style={{ color: "purple", fontWeight: "bold", fontSize: 30 }}>Лобби</Text>

        </ View>
    )
}