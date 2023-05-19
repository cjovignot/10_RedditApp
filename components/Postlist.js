import * as React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Provider as PaperProvider, IconButton } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

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
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTA5NTk1LCJpYXQiOjE2ODQ0MjMxOTUsImp0aSI6IjMwMjgyNzQ4MzIzOC1DTlpZTGVTSFE3RjdYd1E1TE04OWRCRXFEZmw4MmciLCJjaWQiOiJMbUtZMkJiRkpzcGgzZmdvaGV1ME13IiwibGlkIjoidDJfM3Y0N254aWUiLCJhaWQiOiJ0Ml8zdjQ3bnhpZSIsImxjYSI6MTU1OTI3NzA0MjExNywic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.06PpEAfQpzSmzBgStZLk9B-_IVhS-PgazV9ReD_DntA0HZ-MwjLTHUfmab2Rti-RFe-tK8YMIEfgRlENPdaEbqZBMyAQFecDQL30NqqArp4S56H65Sqd8AapYJMsUNWCA8Glsn2Hs_5u8fvr9bTHnGX2iWwIZXH62ttaO_F6J4qywo3v2xsweAEuL9fzrPjFSkN4NUMQQMkzSu3oWjV0NIR4efwDEbTvLQfYyKtgdD6bs6ecQv1zI3G7KwR6gjiWV7Z_Yq5aAHmmfBhQWh1mMy7AWYIFdmJ0p2oVXFJzeZQeG2828a7yQzwoaXMCB51lyOz8kCunAc88C0TWrDdYXA"}`,
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
        <Text>Posts from {subreddit}</Text>
        {posts &&
          posts.map((post, index) => (
            <Text key={index}>{post.data?.title}</Text>
          ))}
        <View style={styles.loader}>
          <Button
            icon="plus"
            mode="contained"
            buttonColor="black"
            dark={true}
            onPress={loadMorePosts}
            style={{ maxWidth: 200 }}
          >
            Load More
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          {showScroll && (
            <IconButton
              icon="arrow-up-bold-box"
              size={28}
              onPress={Topscroll}
            />
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {showScroll && (
          <IconButton icon="arrow-up-bold-box" size={28} onPress={Topscroll} />
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
