import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../utils/SupabaseConfigue";
import Ionicons from "@expo/vector-icons/Ionicons";
import CourseInfo from "../components/CourseInfo";

export default function CategoryDetails() {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState(null);
  const router = useRouter();

  const getCategoryDetails = async () => {
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryList(*)")
      .eq("id", categoryId);

    if (error) {
      console.error(error);
    } else if (data.length > 0) {
      setCategoryData(data[0]);
    }
  };

  useEffect(() => {
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.replace("/(tabs)")}
        style={styles.back}
      >
        <Ionicons name="arrow-back-circle" size={32} color="black" />
      </TouchableOpacity>

      <CourseInfo
        categoryData={categoryData}
        getCategoryDetails={getCategoryDetails}
      />

      <Link
        href={{
          pathname: "/addnewcategoryitem",
          params: {
            categoryId: categoryData?.id,
          },
        }}
        style={styles.add}
      >
        <Ionicons name="add-circle" size={50} color="#8B42FC" />
      </Link>
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
  budget: {
    fontSize: 18,
    color: "#555",
  },
  back: {
    marginTop: 20,
  },
  loading: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  add: {
    position: "absolute",
    bottom: 17,
    right: 17,
  },
});
