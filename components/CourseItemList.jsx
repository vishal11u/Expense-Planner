import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Linking,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { supabase } from "../utils/SupabaseConfigue";

export default function CourseItemList({ categoryData, setUpdateRecord }) {
  const [expand, setExpand] = useState();

  const onDeleteItem = async (id) => {
    const { error } = await supabase.from("CategoryList").delete().eq("id", id);

    ToastAndroid.show("Item Deleted", ToastAndroid.SHORT);
    setUpdateRecord(true);
  };

  const openURL = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.list}>Item List</Text>

      <View>
        {categoryData.CategoryList.map((item, index) => (
          <>
            <TouchableOpacity
              onPress={() => setExpand(index)}
              key={index}
              style={styles.item}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.uriContainer}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.url}>{item.url}</Text>
              </View>
              <Text style={styles.cost}>${item.cost}</Text>
            </TouchableOpacity>

            {expand === index && (
              <View style={styles.editor}>
                <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                  <MaterialIcons name="delete-outline" size={24} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => openURL(item.url)}>
                  <Feather name="external-link" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
          </>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  list: {
    fontSize: 19,
    fontWeight: "bold",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 17,
    marginRight: 15,
  },
  item: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  url: {
    color: "#666",
    fontSize: 12,
  },
  cost: {
    fontSize: 18,
    // color: "#666",
    fontWeight: "bold",
  },
  itemTitle: {
    fontSize: 20,
    // color: "#666",
    fontWeight: "bold",
  },
  uriContainer: {
    flex: 1,
    gap: 5,
    marginRight: 15,
  },
  editor: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
});
