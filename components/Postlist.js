import * as React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Provider as PaperProvider, IconButton } from "react-native-paper";

import Card from '../components/Card';

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
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTc3NDYxLjQ1MTgyMiwiaWF0IjoxNjg0NDkxMDYxLjQ1MTgyMiwianRpIjoiMzE5Nzk1NDkxNzg5MjktUG9RODNPX0twcDNTQmxPM215Z3E5aVdyNnNxblZ3IiwiY2lkIjoiaUFqckRzTHlGX0VTdEdJYU40NU5nUSIsImxpZCI6InQyX2JjMzc5dzY1dCIsImFpZCI6InQyX2JjMzc5dzY1dCIsImxjYSI6MTY4NDE0ODc4NzQyMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.PjXYz1SuHZ7Jw4KiMXUP1uGnqfMdwbrXtR7ZCwjgUsyA13YD56Nm-QftKSMLBF03S6ZrIeLrNkKM1fT3IROcnYUB8hzNP62MrzJWKR6cJoLUwf032E2-Nm8LRqaA3lUYoCCbzKEnTWC8iNw-4voqxZbudhUonR3-Zun3Z-PFDjHdU9pQZLhZl9RB3325QK9EHO9qLrNLlLum0Nu0OqTCyj84Gezxfi7sxkeMet08A9q2gnEWQy5OeOfG7YHMXF0OypUe41yzqpFVzHVsMofkXdQmENLSalH02JsXRu-3BsRMCLVVOxnRsNF4h48aWCguXEE3w87UJqmhGK3qs3nnlg"}`,
    },
  });

  const fetchData = async (afterParam = null) => {
    try {
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

  React.useEffect(() => {
    fetchData();
    navigation.setOptions({ title: subreddit });
  }, [subreddit]);

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
        {posts && posts.map((post, index) => (
          <Card key={index} subredditsData={post}/>
        ))}

        <View style={styles.loader}>
          <Button
            icon="plus"
            mode="contained"
            buttonColor="black"
            dark={true}
            onPress={loadMorePosts}
            style={{ maxWidth: 200, margin: 20 }} >Load More
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
