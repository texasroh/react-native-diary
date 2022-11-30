import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Write from "./screens/Write";

const Tabs = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Write: undefined;
};

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
