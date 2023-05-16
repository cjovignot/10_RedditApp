import React from "react";
import { View, Text } from "react-native";
import RedditLogin from "./RedditAuth"

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the profile screen</Text>
      <RedditLogin/>
    </View>
  );
}

export default ProfileScreen;
