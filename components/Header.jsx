import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { client } from "../utils/KindeConfigue";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header() {
  const [user, setUser] = useState();

  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={style.parent}>
      <View style={style.main}>
        <Image style={style.image} source={{ uri: user?.picture }} />
        <View>
          <Text style={style.text1}>Welcome,</Text>
          <Text style={style.text}>{user?.given_name}</Text>
        </View>
      </View>
      <View>
        <Ionicons name="notifications-circle-outline" size={36} color="white" />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  parent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 99,
  },
  main: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text1: {
    color: "white",
    fontSize: 15,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
