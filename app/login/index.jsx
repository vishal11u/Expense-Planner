import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import LoginScreenImage from "../../assets/images/loginPage.png";
import { client } from "../../utils/KindeConfigue";
import { useRouter } from "expo-router";
import services from "../../utils/services";

export default function LoginScreen() {
  const route = useRouter();

  const handleSignIn = async () => {
    const token = await client.logout();
    if (token) {
      await services.storeData("login", "true");
      route.replace("/");
    }
  };

  return (
    <View style={style.main}>
      <Image source={LoginScreenImage} style={style.bgImage} />
      <View style={style.child}>
        <Text style={style.text}>Personal Budget Planer</Text>
        <Text style={style.childText}>
          Stay on Track, Every Event by Event Your Perssonal Budget Planner App!
        </Text>
        <TouchableOpacity onPress={handleSignIn} style={style.button}>
          <Text style={style.buttonText}>Login/SignUp</Text>
        </TouchableOpacity>
        <Text style={style.terms}>
          *By Login/Signup You will Agree our Terms and Conditions.
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  bgImage: {
    width: 250,
    height: 500,
    borderWidth: 5,
    borderRadius: 20,
    marginTop: 70,
    borderColor: "#000",
  },
  main: {
    display: "flex",
    alignItems: "center",
  },
  child: {
    backgroundColor: "#8B42FC",
    height: "100%",
    width: "100%",
    padding: 20,
    marginTop: -35,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginTop: 0,
  },
  childText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    marginTop: 15,
  },
  button: {
    padding: 20,
    paddingHorizontal: 5,
    borderRadius: 99,
    marginTop: 25,
    backgroundColor: "white",
  },
  buttonText: {
    color: "#8B42FC",
    textAlign: "center",
  },
  terms: {
    fontSize: 12,
    color: "white",
    marginTop: 15,
    textAlign: "center",
  },
});
