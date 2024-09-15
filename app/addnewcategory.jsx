import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Foundation from "@expo/vector-icons/Foundation";
import { supabase } from "../utils/SupabaseConfigue";
import { client } from "../utils/KindeConfigue";
import { useRouter } from "expo-router";

export default function AddNewCategory() {
  const [selectedIcon, setSelectedIcon] = useState("Tu");
  const [selectedColor, setSelectedColor] = useState("#fbd203");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");

  const router = useRouter();

  const isButtonDisabled = !category || !budget;

  const onCreateCategory = async () => {
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("Category")
      .insert([
        {
          name: category,
          assigned_budget: budget,
          icon: selectedIcon,
          color: selectedColor,
          created_by: user.email,
        },
      ])
      .select();

    if (data) {
      router.replace({
        pathname: "/categorydetails",
        params: {
          categoryId: data[0].id,
        },
      });
      ToastAndroid.show("Category Created!", ToastAndroid.SHORT);
    }
    if (error) {
      ToastAndroid.show("Error creating category", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.iconInputWrapper}>
        <TextInput
          style={[styles.inputIcon, { backgroundColor: selectedColor }]}
          onChangeText={(value) => setSelectedIcon(value)}
          value={selectedIcon}
        />
      </View>

      <ColorPicker
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <View style={styles.inputview}>
        <MaterialIcons name="local-offer" size={18} color="black" />
        <TextInput
          style={styles.inputField}
          placeholder="Enter Category"
          placeholderTextColor="#888"
          onChangeText={setCategory}
          value={category}
        />
      </View>

      <View style={styles.inputview}>
        <Foundation name="dollar" size={28} color="black" />
        <TextInput
          style={styles.inputField}
          placeholder="Enter Budget"
          placeholderTextColor="#888"
          keyboardType="numeric"
          onChangeText={setBudget}
          value={budget}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isButtonDisabled ? "#ccc" : "#8B42FC" },
        ]}
        onPress={() => onCreateCategory()}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>Create Category</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 20,
    padding: 20,
  },
  iconInputWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  inputIcon: {
    textAlign: "center",
    fontSize: 30,
    padding: 25,
    borderRadius: 99,
    color: "white",
    width: 92,
  },
  inputField: {
    fontSize: 16,
    width: "100%",
  },
  inputview: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 10,
    borderColor: "#ccc",
    padding: 10,
    gap: 10,
  },
  button: {
    backgroundColor: "#8B42FC",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
