import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";

const View = styled.View``;
const Text = styled.Text``;

const Home: React.FC<NativeStackScreenProps<any, any>> = ({
    navigation: { navigate },
}) => (
    <View>
        <Text>Home</Text>
    </View>
);

export default Home;
