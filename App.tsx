import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Navigator from "./Navigator";
import Realm from "realm";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { useEffect } from "react";

preventAutoHideAsync();

const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
  },
  primaryKey: "_id",
};

export default function App() {
  useEffect(() => {
    const prepare = async () => {
      const realm = await Realm.open({
        path: "diaryDB",
        schema: [FeelingSchema],
      });

      hideAsync();
    };
    prepare();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Navigator />
    </NavigationContainer>
  );
}
