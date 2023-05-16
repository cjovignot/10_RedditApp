import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import ProfileScreen from "./components/ProfileScreen";
import SecondScreen from "./components/SecondScreen";
import HomePage from "./components/HomePage";
import Drawer from "./components/Drawer";
import { Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <Text>C'est la faute de Cosme</Text>
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
        <Button mode="contained" onPress={() => navigation.navigate("Second")}>
          Go to Second Screen
        </Button> */}
        {/* <Drawer /> */}
        <HomePage />
      </View>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <IconButton
      icon="account-circle"
      size={28}
      onPress={() => navigation.navigate("Profile")}
    />
  ),
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Ditters"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <IconButton
                  icon="account-circle"
                  size={28}
                  onPress={() => navigation.navigate("MySubRedditList")}
                />
              ),
            })}
          />
          <Stack.Screen name="Subreddit" component={Subreddit} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="MySubRedditList" component={MySubRedditList} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
export default App;
