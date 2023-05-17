import * as React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Provider as PaperProvider, IconButton } from "react-native-paper";

import { Button } from "react-native-paper";
import axios from "axios";

const Postlist = ({ route, navigation }) => {
  // const [posts, setPosts] = React.useState([]);
  // const [after, setAfter] = React.useState(null);
  // const [showScroll, setShowScroll] = React.useState(false);
  // const SCROLL_THRESHOLD = 300;
  // const { subreddit } = route.params;

  // const scrollViewRef = React.useRef();

  // const api = axios.create({
  //   baseURL: "https://oauth.reddit.com",
  //   headers: {
  //     Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0MzI2MDQ4LCJpYXQiOjE2ODQyMzk2NDgsImp0aSI6IjMwMjgyNzQ4MzIzOC14OXRkM3A3czIzcjBhVk8yWnVKWG1wV0kxTFBBNmciLCJjaWQiOiJMbUtZMkJiRkpzcGgzZmdvaGV1ME13IiwibGlkIjoidDJfM3Y0N254aWUiLCJhaWQiOiJ0Ml8zdjQ3bnhpZSIsImxjYSI6MTU1OTI3NzA0MjExNywic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MifQ.zzFlv3-CBBa2C0Lhw7rrh7gJSOvlVESRw5_jMDvoPIKu4T3ZLKLXfThIK9q6y2E7nQAY1ZLySZ1SOUA8EphrAhkGL2KR1nhsh30i9vFljCKJR-VMh9P42L8UAuT1LAbpozY_AqvxUUIqHcWmVSmsPjdxNhZc3yhkjbiXyCebr1WfUCRP278o77eDiCTgtO9awSeqZk_eJwZ3qo6_Fl8XG7_EqkvmeMgdTdeywnx2ExsFgb0Gn4mZxOqhYnSHfSPQ7spgYZ-idfkrg2NZe01YmAT6Gw60R8N6CaC1uxRLqRJdkNfNRHkhZMKfDY1NDwoeg6D7UBcz5vqRBokOxuMwAQ"}`,
  //   },
  // });

  // const fetchData = async (afterParam = null) => {
  //   try {
  //     const response = afterParam
  //       ? await api.get(`/r/${subreddit}/hot`, {
  //           params: { after: afterParam },
  //         })
  //       : await api.get(`/r/${subreddit}/hot`);
  //     setAfter(response.data.data.after);
  //     setPosts((prevPosts) => [...prevPosts, ...response.data.data.children]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // React.useEffect(() => {
  //   fetchData();
  //   navigation.setOptions({ title: subreddit });
  // }, [subreddit]);

  // const loadMorePosts = () => {
  //   fetchData(after);
  // };

  // const Topscroll = () => {
  //   scrollViewRef.current.scrollTo({ y: 0, animated: true });
  // };

  // const ScrollOffset = (event) => {
  //   const offsetY = event.nativeEvent.contentOffset.y;
  //   setShowScroll(offsetY > SCROLL_THRESHOLD);
  // };

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
