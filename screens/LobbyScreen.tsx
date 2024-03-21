import {FlatList, Text, View} from "react-native";
import {styles} from "../styles";
import {useState} from "react";
//import {getLobbyList} from "../utils";
import {LobbyDto} from "../dto";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {FetchWrapper} from "../fetch-wrapper";

export function LobbyScreen() {

    const [lobbyList, setLobbyList] = useState<LobbyDto[]>([]);


    const fetchAndSetLobbyList = () => {
        const response = FetchWrapper().get("/lobby", null) as unknown as LobbyDto[];
        setLobbyList(response);

    }

    useFocusEffect(
        React.useCallback(()=>{
            fetchAndSetLobbyList();
        },[lobbyList])
    )


    const renderLobbyList = () => {
        return (
        <FlatList
            data={lobbyList}
            renderItem={({item}) => <Text>
                Дата создания - {item.creationDate}
                Размер - {item.size}
        </Text>}
            />
            )
    }


    return (
        <View style={styles.container}>
            <Text style={{color: "purple", fontWeight: "bold", fontSize: 30}}>Лобби</Text>
            {renderLobbyList()}
        </ View>
    )
    
}
