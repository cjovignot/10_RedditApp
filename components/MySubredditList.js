import * as React from "react";
import { Drawer } from "react-native-paper";
import { Button } from "react-native-paper";

const MySubRedditList = () => {
  const [subrUser, setSubrUser] = useState(null);
  const [visible, setVisible] = React.useState(false);

  const toggleDrawer = () => setVisible(!visible);

  useEffect(() => {
    // Fetch data when component mounts
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

  const [active, setActive] = React.useState("");

  return (
    <>
      <Button onPress={toggleDrawer}>Toggle Drawer</Button>
      <Drawer.Section title="My Subreddit" visible={visible}>
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
    </>
  );
};

export default MySubRedditList;
