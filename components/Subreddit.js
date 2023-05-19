import * as React from "react";
import { Drawer, Portal, Modal } from "react-native-paper";
import { StyleSheet } from "react-native";
import axios from "axios";
import {TOKEN_COSME} from '@env';

const MySubRedditList = ({ visible, onClose }) => {
  const [subrUser, setSubrUser] = React.useState(null);
  const [active, setActive] = React.useState("");
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
        console.log(response.data.data.children);
        setSubrUser(response.data.data.children);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.containerStyle}
      >
        <Drawer.Section title="My Subreddit">
          {subrUser &&
            subrUser.map((subreddit, index) => (
              <Drawer.Item
                key={index}
                label={subreddit.data.url}
                active={active === subreddit.data.url}
                onPress={() => setActive(subreddit.data.url)}
              />
            ))}
        </Drawer.Section>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
});

export default MySubRedditList;
