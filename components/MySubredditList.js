import * as React from "react";
import { Drawer } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const MySubRedditList = () => {
  const [subrUser, setSubrUser] = React.useState(null);
  const navigation = useNavigation();

  const api = axios.create({
    baseURL: "https://oauth.reddit.com",
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTA5NTk1LCJpYXQiOjE2ODQ0MjMxOTUsImp0aSI6IjMwMjgyNzQ4MzIzOC1DTlpZTGVTSFE3RjdYd1E1TE04OWRCRXFEZmw4MmciLCJjaWQiOiJMbUtZMkJiRkpzcGgzZmdvaGV1ME13IiwibGlkIjoidDJfM3Y0N254aWUiLCJhaWQiOiJ0Ml8zdjQ3bnhpZSIsImxjYSI6MTU1OTI3NzA0MjExNywic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.06PpEAfQpzSmzBgStZLk9B-_IVhS-PgazV9ReD_DntA0HZ-MwjLTHUfmab2Rti-RFe-tK8YMIEfgRlENPdaEbqZBMyAQFecDQL30NqqArp4S56H65Sqd8AapYJMsUNWCA8Glsn2Hs_5u8fvr9bTHnGX2iWwIZXH62ttaO_F6J4qywo3v2xsweAEuL9fzrPjFSkN4NUMQQMkzSu3oWjV0NIR4efwDEbTvLQfYyKtgdD6bs6ecQv1zI3G7KwR6gjiWV7Z_Yq5aAHmmfBhQWh1mMy7AWYIFdmJ0p2oVXFJzeZQeG2828a7yQzwoaXMCB51lyOz8kCunAc88C0TWrDdYXA"}`,
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
  );
};

export default MySubRedditList;
