import React from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import InfoCard from "./InfoCard";

const Info = ({ results }) => {
  if (!results.length) {
    return null;
  }

  return (
    <SafeAreaView>
      <FlatList
        vertical
        data={results}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (
            <View>
              <InfoCard result={ item } />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Info;