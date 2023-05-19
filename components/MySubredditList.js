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

const MySubRedditList = () => {
  const [subrUser, setSubrUser] = React.useState(null);
  const navigation = useNavigation();

  const api = axios.create({
    baseURL: "https://oauth.reddit.com",
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTY4OTQ1Ljc2NDAzMywiaWF0IjoxNjg0NDgyNTQ1Ljc2NDAzMiwianRpIjoiMzAyODI3NDgzMjM4LUNKYVhYZ0FsYkpiekJrR1lsMGdoYTItM1V1bVNtUSIsImNpZCI6IkxtS1kyQmJGSnNwaDNmZ29oZXUwTXciLCJsaWQiOiJ0Ml8zdjQ3bnhpZSIsImFpZCI6InQyXzN2NDdueGllIiwibGNhIjoxNTU5Mjc3MDQyMTE3LCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyIsImZsbyI6OX0.mhCVuz_k56qUlB5iaXVTEMy76ba6jwxlnnOaJVwVfdvd_cI8Cd7UbK_LdksPhUBlWswJV-rgowPHTLvATAnCXerhHyX-oFW8wNwrjVVvKuhMTwjFCJpLv3rB40gz7oBfqgqiShmwmyf54koET8GzY7aqZeb6fIXFjPmjXrVZl1iG3iXFjNtyz7jG0dbjlyflfQzs7dR2QfIuywmx0LahZyEkXwIoZd9NnFSVbVzfxwEh2LtKp1nN4PNq0QlukcM7AbQeCQEVQQU7svcUvj_VzNp9_FUWGo-p-b3NDT36Pfj4FMM_jIdocXdEZ_Xq1VFp43kqWYKVy95AHX-cttRwOQ"}`,
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
