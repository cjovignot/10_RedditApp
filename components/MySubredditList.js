import * as React from "react";
import { Drawer } from "react-native-paper";
import { Button, View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const MySubRedditList = () => {
  const [subrUser, setSubrUser] = React.useState(null);
  const navigation = useNavigation();

  const api = axios.create({
    baseURL: "https://oauth.reddit.com",
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0Mzk3MjE4LCJpYXQiOjE2ODQzMTA4MTgsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LW9yQ2pUZUtOejk5VkpJT0w1NHY0OXhnRlJZeHBvZyIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.BnShEX1aOETDcKDskw01iDJkbvtHUYyFhnRwAfPuk7lFA1eTgVVBYVMUIJvzi6xk4Ma_V0BcUH-dtzpBhH1q9vl90QJS2mpzUjzESsMIc7-zmTTJe322JkHQWEo08FqRaHOxbd6pXnYq43dZsHjcEfvTsnKoHgxqvUSmdidmY4m6dcCR7PK--mBVBhWohIGnaOXWsFKWCKFs_pfU4OIpEmX8AW6od6q6Y0wWxEasrykIqt2hvxKhk2tVni77QMxSpQmet3lVcvFzl__CzXf1liXWJH-hAu14RGIZ6xAsSTmQtCETF0o5F32JrtE32f3WSmOgsOsbohfZTdFCWzSgJQ"}`, // replace with your access token
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
