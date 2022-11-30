import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { RootStackParamList } from "../Navigator";
import { Ionicons } from "@expo/vector-icons";

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

const Home: React.FC<NativeStackScreenProps<RootStackParamList, "Home">> = ({
  navigation: { navigate },
}) => (
  <View>
    <Title>My journal</Title>
    <Btn onPress={() => navigate("Write")}>
      <Ionicons name="add" color="white" size={40} />
    </Btn>
  </View>
);

export default Home;
