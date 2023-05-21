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
    const options = {
      method: "GET",
      url: best
        ? "https://www.reddit.com/best.json"
        : hot
        ? "https://www.reddit.com/hot.json"
        : "https://www.reddit.com/new.json",
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
    setSubredditsData([]);
    setAfter(null);

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
