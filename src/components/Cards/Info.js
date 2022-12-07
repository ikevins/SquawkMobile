import React, {useState} from "react";
import { TouchableOpacity, SafeAreaView, FlatList, View } from "react-native";
import SmallText from "../Texts/SmallText";
import InfoCard from "./InfoCard";

const Info = ({ results }) => {
  return (
    <SafeAreaView>
      <FlatList
        vertical
        data={results}
        showsVerticalScrollIndicator={false}
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