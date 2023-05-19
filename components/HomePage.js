import React, { useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import Card from "./Card";
import Filters from "./Filters";
import axios from "axios";
import {TOKEN_COSME} from '@env';

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
    const token =TOKEN_COSME
    
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
