import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Navigator from "./Navigator";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import Realm from "realm";
import { DBContext } from "./context";

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
  const [realm, setRealm] = useState<Realm>();
  useEffect(() => {
    // const conn = new Realm({
    //   path: "diaryDB",
    //   schema: [FeelingSchema],
    // });
    // setRealm(conn);
    // hideAsync();
    const prepare = async () => {
      const connection = await Realm.open({
        path: "diaryDB",
        schema: [FeelingSchema],
      });
      setRealm(connection);

      hideAsync();
    };
    prepare();
  }, []);
  return (
    <DBContext.Provider value={realm}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
