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

export interface IFeelings {
  schema: {
    name: "Feeling";
    properties: {
      _id: "int";
      emotion: "string";
      message: "string";
    };
    primaryKey: "_id";
  };
  _id: number;
  emotion: string;
  message: string;
}

export default function App() {
  // const [realm, setRealm] = useState<Realm>(
  //   new Realm({
  //     path: "diaryDB",
  //     schema: [FeelingSchema],
  //   })
  // );
  const [realm, setRealm] = useState<Realm>();
  useEffect(() => {
    //   const conn = new Realm({
    //     path: "diaryDB",
    //     schema: [FeelingSchema],
    //   });
    //   setRealm(conn);
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
      <StatusBar style="dark" />
      {realm && (
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      )}
    </DBContext.Provider>
  );
}
