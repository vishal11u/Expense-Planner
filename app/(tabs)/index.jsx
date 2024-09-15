import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import Services from "../../utils/services";
import { Link, useRouter } from "expo-router";
import { client } from "../../utils/KindeConfigue";
import { supabase } from "../../utils/SupabaseConfigue";
import Header from "../../components/Header";
import CircularChart from "../../components/CircularChart";
import AntDesign from "@expo/vector-icons/AntDesign";
import CategoryList from "../../components/CategoryList";

const index = () => {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State to handle refreshing

  const checkUserAuth = async () => {
    const result = await Services.getData("login");
    if (result !== "true") {
      router.replace("/login");
    }
  };

  const getcategoryList = async () => {
    setLoading(true);
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryList(*)")
      .eq("created_by", user.email);

    setCategoryList(data || []);
    data && setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getcategoryList();
    setRefreshing(false);
  };

  useEffect(() => {
    checkUserAuth();
    getcategoryList();
  }, []);

  return (
    <View style={styles.parent}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.main}>
          <Header />
        </View>
        <View style={styles.refresh}>
          <CircularChart categoryList={categoryList} />
          <CategoryList categoryList={categoryList} />
        </View>
      </ScrollView>
      <Link href={"addnewcategory"} style={styles.plus}>
        <AntDesign name="pluscircle" size={40} color="#8B42FC" />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    marginTop: 30,
    flex: 1,
  },
  refresh: {
    padding: 20,
    marginTop: -90,
  },
  main: {
    padding: 20,
    backgroundColor: "#8B42FC",
    height: 150,
  },
  plus: {
    position: "absolute",
    bottom: 19,
    right: 19,
  },
});

export default index;
