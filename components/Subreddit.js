import * as React from "react";
import { Drawer, Portal, Modal } from "react-native-paper";
import { StyleSheet } from "react-native";
import axios from "axios";

const MySubRedditList = ({ visible, onClose }) => {
  const [subrUser, setSubrUser] = React.useState(null);
  const [active, setActive] = React.useState("");
  const api = axios.create({
    baseURL: "https://oauth.reddit.com",
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTc3NDYxLjQ1MTgyMiwiaWF0IjoxNjg0NDkxMDYxLjQ1MTgyMiwianRpIjoiMzE5Nzk1NDkxNzg5MjktUG9RODNPX0twcDNTQmxPM215Z3E5aVdyNnNxblZ3IiwiY2lkIjoiaUFqckRzTHlGX0VTdEdJYU40NU5nUSIsImxpZCI6InQyX2JjMzc5dzY1dCIsImFpZCI6InQyX2JjMzc5dzY1dCIsImxjYSI6MTY4NDE0ODc4NzQyMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.PjXYz1SuHZ7Jw4KiMXUP1uGnqfMdwbrXtR7ZCwjgUsyA13YD56Nm-QftKSMLBF03S6ZrIeLrNkKM1fT3IROcnYUB8hzNP62MrzJWKR6cJoLUwf032E2-Nm8LRqaA3lUYoCCbzKEnTWC8iNw-4voqxZbudhUonR3-Zun3Z-PFDjHdU9pQZLhZl9RB3325QK9EHO9qLrNLlLum0Nu0OqTCyj84Gezxfi7sxkeMet08A9q2gnEWQy5OeOfG7YHMXF0OypUe41yzqpFVzHVsMofkXdQmENLSalH02JsXRu-3BsRMCLVVOxnRsNF4h48aWCguXEE3w87UJqmhGK3qs3nnlg"}`, // replace with your access token
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
