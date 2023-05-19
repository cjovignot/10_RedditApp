import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TextInput } from "react-native";
import axios from "axios";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Avatar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RedditLogin from "./RedditAuth";

function ProfileScreen() {
  let [data, setData] = useState(undefined);
  let [token, setToken] = useState(undefined);

  async function FetchDetails() {
    var token = await AsyncStorage.getItem("UserToken");
    setToken(token);
    axios({
      method: "get",
      url: `https://oauth.reddit.com/api/v1/me`,
      headers: {
        Authorization: `bearer ${token}`,
      },
    }).then((response) => {
      setData(response.data);
      console.log(data.icon_img);
    });
  }

  useEffect(() => {
    FetchDetails();
  }, []);

  if (data === undefined) {
    return (
      <>
        <RedditLogin FetchDetails={FetchDetails} setData={setData} />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Please Login, I'm waiting.</Text>
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>
      </>
    );
  }

  // const timestamp = data.created_utc;
  // const date = new Date(timestamp * 1000);
  // const options = { month: "short", day: "numeric", year: "numeric" };
  // const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <>
      <RedditLogin />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Avatar.Image
          size={128}
          source={{
            uri: `${data.icon_img.slice(0, data.icon_img.indexOf("?"))}`,
          }}
        />
        <Text>This is the profile screen</Text>
        <Text>{data.subreddit.title}</Text>
        <Text>{data.subreddit.display_name_prefixed}</Text>
        <Text>{data.subreddit.subscribers} abonnés</Text>

        <Text>{data.subreddit.public_description}</Text>
        <Text>{data.link_karma} karma</Text>
        {/* <Text>{formattedDate}</Text> */}
      </View>
    </>
  );
}

export default ProfileScreen;
