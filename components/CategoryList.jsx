import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function CategoryList({ categoryList }) {
  const router = useRouter();

  const onCategoryList = (category) => {
    router.push({
      pathname: "/categorydetails",
      params: {
        categoryId: category.id,
      },
    });
  };

  const calculateTotalCost = (categoryItems) => {
    if (!categoryItems || categoryItems.length === 0) return 0;
    let totalCost = 0;
    categoryItems.forEach((item) => {
      totalCost = totalCost + item?.cost;
    });
    return totalCost;
  };

  return (
    <View>
      <Text style={styles.headerText}>Latest Budget</Text>
      <View>
        {categoryList && categoryList.length > 0 ? (
          categoryList?.map((category, index) => (
            <TouchableOpacity
              onPress={() => onCategoryList(category)}
              key={index}
              style={styles.main}
            >
              <View
                style={[
                  styles.categoryContainer,
                  { backgroundColor: category?.color },
                ]}
              >
                <Text style={styles.icon}>{category?.icon}</Text>
              </View>

              <View style={styles.detailsWrapper}>
                <View>
                  <Text style={styles.name}>{category?.name}</Text>
                  <Text style={styles.category}>
                    {category?.CategoryList?.length > 0
                      ? `${category.CategoryList.length} items`
                      : "No items available"}
                  </Text>
                </View>
                <Text style={styles.budget}>
                  $ {calculateTotalCost(category?.CategoryList)}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No categories found</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 10,
    backgroundColor: "white",
    padding: 7,
    borderRadius: 10,
  },
  categoryContainer: {
    padding: 15,
    borderRadius: 10,
  },
  icon: {
    fontSize: 25,
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
  category: {
    fontSize: 15,
    color: "#666",
  },
  budget: {
    fontSize: 17,
    color: "#555",
    fontWeight: "bold",
  },
});
