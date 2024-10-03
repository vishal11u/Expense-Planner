import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import PieChart from "react-native-pie-chart";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function CircularChart({ categoryList }) {
  const widthAndHeight = 150;
  const [value, setValue] = useState([]);
  const [color, setColor] = useState([]);
  const [total, setTotal] = useState(0);

  const multipleColors = [
    "#FF69B4",
    "#33CC33",
    "#66CCCC",
    "#FF9900",
    "#CC33CC",
    "#66CC00",
    "#CC66CC",
  ];

  const updateCircularChart = () => {
    let totalEstimate = 0;
    let otherCost = 0;
    let tempValues = [];
    let tempColors = [];

    categoryList?.forEach((item, index) => {
      if (index < 4) {
        let totalItemCost = 0;
        item?.CategoryList?.forEach((item_) => {
          totalItemCost += item_.cost;
          totalEstimate += item_.cost;
        });
        tempColors.push(multipleColors[index]);
        tempValues.push(totalItemCost);
      } else {
        item?.CategoryList?.forEach((item_) => {
          otherCost += item_.cost;
          totalEstimate += item_.cost;
        });
      }
    });

    if (otherCost > 0) {
      tempColors.push(multipleColors[4]);
      tempValues.push(otherCost);
    }

    if (totalEstimate > 0) {
      setColor(tempColors);
      setValue(tempValues);
    }

    setTotal(totalEstimate);
  };

  useEffect(() => {
    if (categoryList?.length) {
      updateCircularChart();
    }
  }, [categoryList]);

  return (
    <View style={style.main}>
      <Text style={style.text}>
        Total Estimate: <Text style={style.span}>$ {total}</Text>
      </Text>
      <View style={style.chartDiv}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={value.length > 0 ? value : [1]} 
          sliceColor={color.length > 0 ? color : ["gray"]}
          coverRadius={0.65}
          coverFill={"#FFF"}
        />
        {categoryList?.length === 0 ? (
          <View style={style.content}>
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={24}
              color="gray"
            />
            <Text>NA</Text>
          </View>
        ) : (
          <View>
            {categoryList?.map(
              (list, index) =>
                index <= 4 && (
                  <View key={index} style={style.content}>
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle"
                      size={24}
                      color={multipleColors[index]}
                    />
                    <Text>{index < 4 ? list?.name : "Other"}</Text>
                  </View>
                )
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    elevation: 1,
  },
  span: {
    fontWeight: "bold",
  },
  chartDiv: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
