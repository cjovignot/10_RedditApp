import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import Card from "./Card";
import Filters from "./Filters";
import axios from "axios";

function HomePage() {
  const [subredditsData, setSubredditsData] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [after, setAfter] = useState(null);

  const fetchData = (after = null) => {
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTY4OTQ1Ljc2NDAzMywiaWF0IjoxNjg0NDgyNTQ1Ljc2NDAzMiwianRpIjoiMzAyODI3NDgzMjM4LUNKYVhYZ0FsYkpiekJrR1lsMGdoYTItM1V1bVNtUSIsImNpZCI6IkxtS1kyQmJGSnNwaDNmZ29oZXUwTXciLCJsaWQiOiJ0Ml8zdjQ3bnhpZSIsImFpZCI6InQyXzN2NDdueGllIiwibGNhIjoxNTU5Mjc3MDQyMTE3LCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyIsImZsbyI6OX0.mhCVuz_k56qUlB5iaXVTEMy76ba6jwxlnnOaJVwVfdvd_cI8Cd7UbK_LdksPhUBlWswJV-rgowPHTLvATAnCXerhHyX-oFW8wNwrjVVvKuhMTwjFCJpLv3rB40gz7oBfqgqiShmwmyf54koET8GzY7aqZeb6fIXFjPmjXrVZl1iG3iXFjNtyz7jG0dbjlyflfQzs7dR2QfIuywmx0LahZyEkXwIoZd9NnFSVbVzfxwEh2LtKp1nN4PNq0QlukcM7AbQeCQEVQQU7svcUvj_VzNp9_FUWGo-p-b3NDT36Pfj4FMM_jIdocXdEZ_Xq1VFp43kqWYKVy95AHX-cttRwOQ";

    const options = {
      method: "GET",
      url: "https://oauth.reddit.com/best",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    if (after) {
      // Append 'after' parameter to fetch the next page
      options.url += `?after=${after}`;
    }

    axios
      .request(options)
      .then(function (res) {
        const data = res.data.data.children;
        const newAfter = res.data.data.after; // Get the 'after' value for pagination
        const newSubredditsData = [...subredditsData, ...data];
        setSubredditsData(newSubredditsData);
        setImageUrl(newSubredditsData.map((item) => item.data));
        setAfter(newAfter); // Update the 'after' value for pagination
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadMore = () => {
    if (after) {
      fetchData(after);
    }
  };

  return (
    <>
      <Filters />
      {/* {subredditsData && subredditsData.map((subreddit, index) => (
        <Card key={index} subredditsData={subreddit} />
      ))} */}

      <FlatList
        data={subredditsData}
        renderItem={({ item }) => <Card subredditsData={item} />}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
      />
    </>
  );
}

export default HomePage;
