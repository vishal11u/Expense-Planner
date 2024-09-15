import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function ColorPicker({ selectedColor, setSelectedColor }) {
  const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00", "#ff3c00"];

  return (
    <View style={styles.container}>
      {sliceColor.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.colorBlock,
            { backgroundColor: color },
            selectedColor === color && { borderWidth: 4, borderColor: "black" }, 
          ]}
          onPress={() => setSelectedColor(color)} 
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    gap: 20,
    marginBottom:15
  },
  colorBlock: {
    width: 30,
    height: 30,
    borderRadius: 99,
  },
});
