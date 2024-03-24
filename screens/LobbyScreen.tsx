import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { styles } from "../styles";
import { useEffect, useState } from "react";
//import {getLobbyList} from "../utils";
import { LobbyDto } from "../dto";
//import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useFetchWrapper }from "../fetch-wrapper";

const LobbyScreen: React.FC = () => {
  const [lobbyList, setLobbyList] = useState<LobbyDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {get} = useFetchWrapper();

  useEffect(() => {
    const fetchAndSetLobbyList = async () => {
      try {
        const response = await get("/lobby", null);
        const lobbyData = await response.json(); // Assuming JSON response
        setLobbyList(lobbyData);
      } catch (error) {
        console.error("Error fetching lobby list:", error);
        // Handle error appropriately, e.g., display an error message
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndSetLobbyList();
  }, [get]);


  const renderItem = ({ item }: { item: LobbyDto }) => (<Text>{item.id}</Text>);

  const renderLobbyList = () => {
    if (isLoading) {
      return <ActivityIndicator />;
    }

    if (lobbyList.length === 0) {
      return <Text>No lobbies found.</Text>;
    }

    return (
      <FlatList
        data={lobbyList}
        renderItem={renderItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "purple", fontWeight: "bold", fontSize: 30 }}>
        Лобби
      </Text>
      {renderLobbyList()}
    </View>
  );
}

export default LobbyScreen;