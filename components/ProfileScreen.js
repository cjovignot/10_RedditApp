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
    if (token) {
      axios({
        method: "get",
        url: `https://oauth.reddit.com/api/v1/me`,
        headers: {
          Authorization: `bearer ${token}`,
        },
      }).then((response) => {
        setData(response.data);
      });
    } else {
      setData(undefined);
    }
  }

  useEffect(() => {
    FetchDetails();
  }, [token]);

  if (!token) {
    return (
      <>
        <RedditLogin
          FetchDetails={FetchDetails}
          setData={setData}
          data={data}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Please Login, I'm waiting.</Text>
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>
      </>
    );
  }

  return (
    <>
      <RedditLogin FetchDetails={FetchDetails} setData={setData} data={data} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {data && data.icon_img && (
          <Avatar.Image
            size={128}
            source={{
              uri: `${data.icon_img.slice(0, data.icon_img.indexOf("?"))}`,
            }}
          />
        )}
        {data && data.subreddit && (
          <>
            <Text>{data.subreddit.title}</Text>
            <Text>{data.subreddit.display_name_prefixed}</Text>
            <Text>{data.subreddit.subscribers} abonnés</Text>
            <Text>{data.subreddit.public_description}</Text>
          </>
        )}
        {data && <Text>{data.link_karma} karma</Text>}
      </View>
    </>
  );
}

export default ProfileScreen;
