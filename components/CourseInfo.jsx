import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CourseItemList from "./CourseItemList";
import { supabase } from "../utils/SupabaseConfigue";
import { useRouter } from "expo-router";

export default function CourseInfo({ categoryData, getCategoryDetails }) {
  const [totalCost, setTotalCost] = useState();
  const [totalPerc, setTotalPerc] = useState(0);

  const router = useRouter();

  const calculateTotalCost = () => {
    let total = 0;
    categoryData.CategoryList.forEach((item) => {
      total = total + item.cost;
    });
    setTotalCost(total);

    let totalPercentage = (total / categoryData.assigned_budget) * 100;
    if (totalPercentage > 100) {
      totalPercentage = 100;
    }
    setTotalPerc(totalPercentage);
  };

  const onDeleteCategory = () => {
    Alert.alert("Are You Sure", "Do you realy want to Delete?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase
            .from("CategoryList")
            .delete()
            .eq("category_id", categoryData?.id);

          await supabase.from("Category").delete().eq("id", categoryData?.id);
          ToastAndroid.show("Category Deleted!", ToastAndroid.SHORT);
          router.replace("/(tabs)");
        },
      },
    ]);
  };

  useEffect(() => {
    categoryData && calculateTotalCost();
  }, [categoryData]);

  return (
    <View>
      {categoryData ? (
        <View>
          <View style={styles.main}>
            <View
              style={[
                styles.categoryContainer,
                { backgroundColor: categoryData?.color },
              ]}
            >
              <Text style={styles.icon}>{categoryData?.icon}</Text>
            </View>

            <View style={styles.detailsWrapper}>
              <View>
                <Text style={styles.name}>{categoryData?.name}</Text>
                <Text style={styles.category}>
                  {categoryData?.CategoryList?.length} items
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => onDeleteCategory()}
                style={styles.budget}
              >
                <MaterialIcons name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.totalbudget}>
            <Text>${totalCost}</Text>
            <Text>Total Budget: ${categoryData.assigned_budget}</Text>
          </View>

          <View style={styles.progress}>
            <View
              style={[styles.mainProgress, { width: totalPerc + "%" }]}
            ></View>
          </View>

          <CourseItemList
            categoryData={categoryData}
            setUpdateRecord={() => getCategoryDetails()}
          />
        </View>
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  details: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loading: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 4,
  },
  main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  categoryContainer: {
    padding: 15,
    borderRadius: 10,
  },
  icon: {
    fontSize: 35,
    color: "#000",
  },
  detailsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
  },
  name: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000",
    marginTop: -10,
  },
  totalbudget: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingHorizontal: 10,
  },
  progress: {
    width: "100%",
    backgroundColor: "#ccc",
    marginTop: 7,
    borderRadius: 99,
    height: 15,
  },
  mainProgress: {
    width: "50%",
    backgroundColor: "#000",
    height: 15,
    borderRadius: 99,
  },
});
