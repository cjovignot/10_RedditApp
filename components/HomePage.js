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
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTY4OTQ1Ljc2NDAzMywiaWF0IjoxNjg0NDgyNTQ1Ljc2NDAzMiwianRpIjoiMzAyODI3NDgzMjM4LUNKYVhYZ0FsYkpiekJrR1lsMGdoYTItM1V1bVNtUSIsImNpZCI6IkxtS1kyQmJGSnNwaDNmZ29oZXUwTXciLCJsaWQiOiJ0Ml8zdjQ3bnhpZSIsImFpZCI6InQyXzN2NDdueGllIiwibGNhIjoxNTU5Mjc3MDQyMTE3LCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyIsImZsbyI6OX0.mhCVuz_k56qUlB5iaXVTEMy76ba6jwxlnnOaJVwVfdvd_cI8Cd7UbK_LdksPhUBlWswJV-rgowPHTLvATAnCXerhHyX-oFW8wNwrjVVvKuhMTwjFCJpLv3rB40gz7oBfqgqiShmwmyf54koET8GzY7aqZeb6fIXFjPmjXrVZl1iG3iXFjNtyz7jG0dbjlyflfQzs7dR2QfIuywmx0LahZyEkXwIoZd9NnFSVbVzfxwEh2LtKp1nN4PNq0QlukcM7AbQeCQEVQQU7svcUvj_VzNp9_FUWGo-p-b3NDT36Pfj4FMM_jIdocXdEZ_Xq1VFp43kqWYKVy95AHX-cttRwOQ";

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
