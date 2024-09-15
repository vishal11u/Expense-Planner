import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Foundation from "@expo/vector-icons/Foundation";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../utils/SupabaseConfigue";
import { decode } from "base64-arraybuffer";
import { useRouter } from "expo-router";

export default function AddNewCategoryItem() {
  const placeHolder =
    "https://static.vecteezy.com/system/resources/previews/004/968/473/original/upload-or-add-a-picture-jpg-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg";
  const [image, setImage] = useState(placeHolder);
  const [preImage, setPreImage] = useState(placeHolder);
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState(0);
  const [note, setNote] = useState("");
  const [url, setUrl] = useState("");
  const { categoryId } = useLocalSearchParams();

  const router = useRouter();

  const isButtonDisabled = !category || !cost || !note || !url;

  const onImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //   aspect: [4, 3],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].base64);
      setPreImage(result.assets[0].uri);
    }
  };

  const onClickAdd = async () => {
    const fileName = Date.now();
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName + ".png", decode(image), {
        contentType: "image/png",
      });

    if (data) {
      const imageUrl =
        "https://lizndakbkniexwedvrib.supabase.co/storage/v1/object/public/image/" +
        fileName +
        ".png";

      const { data, error } = await supabase
        .from("CategoryList")
        .insert([
          {
            name: category,
            cost: cost,
            note: note,
            url: url,
            image: imageUrl,
            category_id: categoryId,
          },
        ])
        .select();
      ToastAndroid.show("New Item Added!", ToastAndroid.SHORT);

      router.replace({
        pathname: "/categorydetails",
        params: {
          categoryId: categoryId,
        },
      });
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => onImagePicker()}>
          <Image source={{ uri: preImage }} style={styles.image} />
        </TouchableOpacity>

        <View style={styles.inputview}>
          <MaterialIcons name="local-offer" size={18} color="#ccc" />
          <TextInput
            style={styles.inputField}
            placeholder="Item Name"
            placeholderTextColor="#888"
            onChangeText={setCategory}
            value={category}
          />
        </View>

        <View style={styles.inputview}>
          <Foundation name="dollar" size={28} color="#ccc" />
          <TextInput
            style={styles.inputField}
            placeholder="Cost"
            placeholderTextColor="#888"
            keyboardType="numeric"
            onChangeText={setCost}
            value={cost}
          />
        </View>

        <View style={styles.inputview}>
          <Feather name="link-2" size={20} color="#ccc" />
          <TextInput
            style={styles.inputField}
            placeholder="Url"
            numberOfLines={2}
            placeholderTextColor="#888"
            onChangeText={setUrl}
            value={url}
          />
        </View>

        <View style={styles.inputview}>
          <Ionicons name="pencil" size={20} color="#ccc   " />
          <TextInput
            style={styles.inputField}
            numberOfLines={3}
            placeholder="Note"
            placeholderTextColor="#888"
            onChangeText={setNote}
            value={note}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isButtonDisabled ? "#ccc" : "#8B42FC" },
          ]}
          onPress={() => onClickAdd()}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Create Category</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    borderRadius: 7,
  },
  container: {
    padding: 20,
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
