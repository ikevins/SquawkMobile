import React, {useState} from "react";
import { TouchableOpacity, SafeAreaView, FlatList, View } from "react-native";
import SmallText from "../Texts/SmallText";
import InfoCard from "./InfoCard";

const Info = ({ results, term, location }) => {

  if (!results.length) {
    return null;
  }

  if (term === '') {
    term='all';
  }

  results.distance = results.distance/1600;

  return (
    <SafeAreaView>
      <SmallText>Showing results for '{term}' in {location}</SmallText>
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