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
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0Mzk3MjE4LCJpYXQiOjE2ODQzMTA4MTgsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LW9yQ2pUZUtOejk5VkpJT0w1NHY0OXhnRlJZeHBvZyIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.BnShEX1aOETDcKDskw01iDJkbvtHUYyFhnRwAfPuk7lFA1eTgVVBYVMUIJvzi6xk4Ma_V0BcUH-dtzpBhH1q9vl90QJS2mpzUjzESsMIc7-zmTTJe322JkHQWEo08FqRaHOxbd6pXnYq43dZsHjcEfvTsnKoHgxqvUSmdidmY4m6dcCR7PK--mBVBhWohIGnaOXWsFKWCKFs_pfU4OIpEmX8AW6od6q6Y0wWxEasrykIqt2hvxKhk2tVni77QMxSpQmet3lVcvFzl__CzXf1liXWJH-hAu14RGIZ6xAsSTmQtCETF0o5F32JrtE32f3WSmOgsOsbohfZTdFCWzSgJQ"}`,
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
