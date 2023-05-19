import * as React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Provider as PaperProvider, IconButton } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

import Card from "../components/Card";

import { Button } from "react-native-paper";
import axios from "axios";

const Postlist = ({ route, navigation }) => {
  const [posts, setPosts] = React.useState([]);
  const [after, setAfter] = React.useState(null);
  const [showScroll, setShowScroll] = React.useState(false);
  const SCROLL_THRESHOLD = 300;
  const { subreddit } = route.params;

  const scrollViewRef = React.useRef();

  const api = axios.create({
    baseURL: "https://oauth.reddit.com",
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTY4OTQ1Ljc2NDAzMywiaWF0IjoxNjg0NDgyNTQ1Ljc2NDAzMiwianRpIjoiMzAyODI3NDgzMjM4LUNKYVhYZ0FsYkpiekJrR1lsMGdoYTItM1V1bVNtUSIsImNpZCI6IkxtS1kyQmJGSnNwaDNmZ29oZXUwTXciLCJsaWQiOiJ0Ml8zdjQ3bnhpZSIsImFpZCI6InQyXzN2NDdueGllIiwibGNhIjoxNTU5Mjc3MDQyMTE3LCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyIsImZsbyI6OX0.mhCVuz_k56qUlB5iaXVTEMy76ba6jwxlnnOaJVwVfdvd_cI8Cd7UbK_LdksPhUBlWswJV-rgowPHTLvATAnCXerhHyX-oFW8wNwrjVVvKuhMTwjFCJpLv3rB40gz7oBfqgqiShmwmyf54koET8GzY7aqZeb6fIXFjPmjXrVZl1iG3iXFjNtyz7jG0dbjlyflfQzs7dR2QfIuywmx0LahZyEkXwIoZd9NnFSVbVzfxwEh2LtKp1nN4PNq0QlukcM7AbQeCQEVQQU7svcUvj_VzNp9_FUWGo-p-b3NDT36Pfj4FMM_jIdocXdEZ_Xq1VFp43kqWYKVy95AHX-cttRwOQ"}`,
    },
  });

  const fetchData = async (afterParam = null) => {
    try {
      setPosts([]);
      const response = afterParam
        ? await api.get(`/r/${subreddit}/hot`, {
            params: { after: afterParam },
          })
        : await api.get(`/r/${subreddit}/hot`);
      setAfter(response.data.data.after);
      setPosts((prevPosts) => [...prevPosts, ...response.data.data.children]);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      navigation.setOptions({ title: subreddit });
    }, [subreddit])
  );

  const loadMorePosts = () => {
    fetchData(after);
  };

  const Topscroll = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const ScrollOffset = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScroll(offsetY > SCROLL_THRESHOLD);
  };

  return (
    <View style={styles.container}>
      <ScrollView onScroll={ScrollOffset} ref={scrollViewRef}>
        {posts &&
          posts.map((post, index) => (
            <Card key={index} subredditsData={post} />
          ))}

        <View style={styles.loader}>
          <Button
            icon="plus"
            mode="contained"
            buttonColor="black"
            dark={true}
            onPress={loadMorePosts}
            style={{ maxWidth: 200, margin: 20 }}
          >
            Load More
          </Button>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {showScroll && (
          <IconButton icon="arrow-up-bold-box" size={40} onPress={Topscroll} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  loader: {
    alignItems: "center",
  },
});
export default Postlist;
