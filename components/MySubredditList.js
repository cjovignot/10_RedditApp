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
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0MzIxMDUwLCJpYXQiOjE2ODQyMzQ2NTAsImp0aSI6IjMwMjgyNzQ4MzIzOC1pVDAwWElTUW9VekFZUnZERFgwRUpqekNHamxYU3ciLCJjaWQiOiJMbUtZMkJiRkpzcGgzZmdvaGV1ME13IiwibGlkIjoidDJfM3Y0N254aWUiLCJhaWQiOiJ0Ml8zdjQ3bnhpZSIsImxjYSI6MTU1OTI3NzA0MjExNywic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MifQ.GcRWPjjhdbNIic6UJottlLowf1NDuP4r_3tBzQSB52hJaCC1QaTknmW4D8H96fCGH3Us_yrTs2eJKMF02m7bTGJWZ0euDOIuWtmrTZIgXDuVKSBoykCdjBtgGkD3v9RM2GWvVx0wT_AsEBcGAIYWF0j2fzz0yW_xTfM1t8gtcoVVuRVoxFtY_-aAD6g9EFq7h92jJ5T4u2uBPflZdTiAGBMPrnveW_oNUjGJo85qEMswioVD3QggSP5iWgVwfIPMhdEYz0w90cR2Rwz5AGzGLi7LLF6hBRzHHDAZUZaDxGusc8xSv7EpK6ESjD1JR9WmwjlCMQm-0kAHcC6MAbeMEA"}`, // replace with your access token
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
