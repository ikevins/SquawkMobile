import React, {useState} from "react";
import { TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import SmallText from "../Texts/SmallText";
import InfoCard from "./InfoCard";
import InfoCardModal from '../Modals/InfoCardModal';

const Info = ({ results, term, location }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showProfileModal = (user) => {
    setHeaderText(user);
    setModalVisible(true);
}

const hideModal = () => {
    setModalVisible(false);
}

  if (!results.length) {
    return null;
  }

  if (term === '') {
    term='all';
  }

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
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={() => 
                <InfoCardModal
                modalVisible={true} 
                hideModal={false}
                />
              }>
              <InfoCard result={ item } />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Info;