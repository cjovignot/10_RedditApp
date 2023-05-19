import * as React from "react";
import { Drawer } from "react-native-paper";
import {
  Button,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {TOKEN_COSME} from '@env';

const MySubRedditList = () => {
  const [subrUser, setSubrUser] = React.useState(null);
  const navigation = useNavigation();

  const api = axios.create({
    baseURL: "https://oauth.reddit.com",
    headers: {
      Authorization: `Bearer ${TOKEN_COSME}`,
    },
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/subreddits/mine/subscriber");
        setSubrUser(response.data.data.children);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      <Drawer.Section title="My SubReddits">
        {subrUser &&
          subrUser.map((subreddit, index) => (
            <Drawer.Item
              key={index}
              label={subreddit.data?.title}
              onPress={() =>
                navigation.navigate("Postlist", {
                  subreddit: subreddit.data?.display_name,
                })
              }
            />
          ))}
      </Drawer.Section>
    </ScrollView>
  );
};

export default MySubRedditList;
