import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { RootStackParamList } from "../Navigator";
import { Ionicons } from "@expo/vector-icons";
import { useDB } from "../context";
import {
  FlatList,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const View = styled.View`
  flex: 1;
  padding: 50px 30px 0;
  background-color: ${colors.bgColor};
`;

const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 100px; ;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  right: 40px;
  background-color: ${colors.btnColor};
  height: 60px;
  width: 60px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  elevation: 5;
`;

const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  padding: 8px 15px;
  border-radius: 10px;
  align-items: center;
`;

const Emotion = styled.Text`
  font-size: 22px;
  margin-right: 10px;
`;
const Message = styled.Text`
  font-size: 18px;
`;

const Separator = styled.View`
  height: 10px;
`;

interface IFeeling {
  _id: number;
  emotion: string;
  message: string;
}

const Home: React.FC<NativeStackScreenProps<RootStackParamList, "Home">> = ({
  navigation: { navigate },
}) => {
  const realm = useDB();
  const [feelings, setFeelings] = useState([]);
  useEffect(() => {
    const feelings = realm.objects("Feeling");
    feelings.addListener((feelings, changes) => {
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      LayoutAnimation.spring();
      setFeelings(feelings.sorted("_id", true) as any);
    });
    return () => {
      feelings.removeAllListeners();
    };
  }, [realm]);

  const onPress = (id: number) => {
    realm.write(() => {
      const feeling = realm.objectForPrimaryKey("Feeling", id);
      realm.delete(feeling);
    });
  };

  return (
    <View>
      <Title>My journal</Title>
      <FlatList<IFeeling>
        data={feelings}
        keyExtractor={(feeling) => feeling._id + ""}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item._id)}>
            <Record>
              <Emotion>{item.emotion}</Emotion>
              <Message>{item.message}</Message>
            </Record>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </View>
  );
};

export default Home;
