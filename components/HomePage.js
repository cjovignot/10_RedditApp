import React, { useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import Card from "./Card";
import Filters from "./Filters";
import axios from "axios";

function HomePage() {
  const [subredditsData, setSubredditsData] = React.useState([]);
  const [after, setAfter] = React.useState(null);

  const [best, setBest] = React.useState(true);
  const [hot, setHot] = React.useState(false);
  const [news, setNews] = React.useState(false);

  const handleBestChange = (value) => {
    setBest(value);
  };

  const handleHotChange = (value) => {
    setHot(value);
  };

  const handleNewsChange = (value) => {
    setNews(value);
  };

  const fetchData = (after = null) => {
    // Fetch data based on the selected filter
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTc3NDYxLjQ1MTgyMiwiaWF0IjoxNjg0NDkxMDYxLjQ1MTgyMiwianRpIjoiMzE5Nzk1NDkxNzg5MjktUG9RODNPX0twcDNTQmxPM215Z3E5aVdyNnNxblZ3IiwiY2lkIjoiaUFqckRzTHlGX0VTdEdJYU40NU5nUSIsImxpZCI6InQyX2JjMzc5dzY1dCIsImFpZCI6InQyX2JjMzc5dzY1dCIsImxjYSI6MTY4NDE0ODc4NzQyMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.PjXYz1SuHZ7Jw4KiMXUP1uGnqfMdwbrXtR7ZCwjgUsyA13YD56Nm-QftKSMLBF03S6ZrIeLrNkKM1fT3IROcnYUB8hzNP62MrzJWKR6cJoLUwf032E2-Nm8LRqaA3lUYoCCbzKEnTWC8iNw-4voqxZbudhUonR3-Zun3Z-PFDjHdU9pQZLhZl9RB3325QK9EHO9qLrNLlLum0Nu0OqTCyj84Gezxfi7sxkeMet08A9q2gnEWQy5OeOfG7YHMXF0OypUe41yzqpFVzHVsMofkXdQmENLSalH02JsXRu-3BsRMCLVVOxnRsNF4h48aWCguXEE3w87UJqmhGK3qs3nnlg";

    const options = {
      method: "GET",
      url: best
        ? "https://oauth.reddit.com/best"
        : hot
        ? "https://oauth.reddit.com/hot"
        : "https://oauth.reddit.com/new",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    if (after) {
      options.url += `?after=${after}`;
    }

    axios
      .request(options)
      .then(function (res) {
        const data = res.data.data.children;
        const newAfter = res.data.data.after;
        setSubredditsData((prevData) => [...prevData, ...data]);
        setAfter(newAfter);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    // Reset the existing data when the filter value changes
    setSubredditsData([]);
    setAfter(null);

    // Fetch new data based on the selected filter
    fetchData();
  }, [best, hot, news]);

  const handleLoadMore = () => {
    if (after) {
      fetchData(after);
    }
  };

  return (
    <>
      <Filters
        best={best}
        hot={hot}
        news={news}
        onBestChange={handleBestChange}
        onHotChange={handleHotChange}
        onNewsChange={handleNewsChange}
      />

      <FlatList
        data={subredditsData}
        renderItem={({ item }) => <Card subredditsData={item} />}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
      />
    </>
  );
}

export default HomePage;
