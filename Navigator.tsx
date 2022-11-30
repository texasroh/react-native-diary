import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigatorProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import Home from "./screens/Home";
import Write from "./screens/Write";

export type RootStackParamList = {
  Home: undefined;
  Write: undefined;
};

const Tabs = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => (
  <Tabs.Navigator
    screenOptions={{
      headerShown: false,
      presentation: "modal",
      animation: "slide_from_right",
    }}
  >
    <Tabs.Screen name="Home" component={Home} />
    <Tabs.Screen name="Write" component={Write} />
  </Tabs.Navigator>
);

export default Navigator;
