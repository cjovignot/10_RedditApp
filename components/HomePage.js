import React, { useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import Card from './Card';
import Filters from './Filters';
import axios from 'axios';

function HomePage() {
  const [subredditsData, setSubredditsData] = React.useState([]);
  const [newSubredditsData, setNewSubredditsData] = React.useState([]);
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


  useEffect(() => {
    // Reset the existing data when the filter value changes
    setSubredditsData([]);
    setNewSubredditsData([]);
    setAfter(null);

    // Fetch new data based on the selected filter
    if (best === true) {
      // console.log(subredditsData, "in best")
      // console.log(newSubredditsData, "new in best")
      // console.log("best fetch", best);
      // console.log("best ok");
      const fetchData = (after = null) => {
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTc3NDYxLjQ1MTgyMiwiaWF0IjoxNjg0NDkxMDYxLjQ1MTgyMiwianRpIjoiMzE5Nzk1NDkxNzg5MjktUG9RODNPX0twcDNTQmxPM215Z3E5aVdyNnNxblZ3IiwiY2lkIjoiaUFqckRzTHlGX0VTdEdJYU40NU5nUSIsImxpZCI6InQyX2JjMzc5dzY1dCIsImFpZCI6InQyX2JjMzc5dzY1dCIsImxjYSI6MTY4NDE0ODc4NzQyMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.PjXYz1SuHZ7Jw4KiMXUP1uGnqfMdwbrXtR7ZCwjgUsyA13YD56Nm-QftKSMLBF03S6ZrIeLrNkKM1fT3IROcnYUB8hzNP62MrzJWKR6cJoLUwf032E2-Nm8LRqaA3lUYoCCbzKEnTWC8iNw-4voqxZbudhUonR3-Zun3Z-PFDjHdU9pQZLhZl9RB3325QK9EHO9qLrNLlLum0Nu0OqTCyj84Gezxfi7sxkeMet08A9q2gnEWQy5OeOfG7YHMXF0OypUe41yzqpFVzHVsMofkXdQmENLSalH02JsXRu-3BsRMCLVVOxnRsNF4h48aWCguXEE3w87UJqmhGK3qs3nnlg';

        const options = {
          method: 'GET',
          url: 'https://oauth.reddit.com/best',
          headers: {
              Authorization: "Bearer " + token,
          }
        }

        if (after) {
          options.url += `?after=${after}`;
        }
          
        axios.request(options).then(function (res) {
          const data = res.data.data.children;
          const newAfter = res.data.data.after;
          const newSubredditsData = [...subredditsData, ...data];
          // console.log(newSubredditsData, "new in best after set")
          setSubredditsData(newSubredditsData);
          // console.log(newSubredditsData, "BEST DATA")
          // setImageUrl(newSubredditsData.map(item => item.data));
          setAfter(newAfter);
        }).catch(function (error) {
          console.error(error);
        });
      };
      fetchData();

    } else if (hot === true) {
      // console.log(subredditsData, "in hot")
      // console.log(newSubredditsData, "new in hot")
      // console.log("hot fetch", hot);
      // console.log("hot ok");
      const fetchHot = (after = null) => {
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTc3NDYxLjQ1MTgyMiwiaWF0IjoxNjg0NDkxMDYxLjQ1MTgyMiwianRpIjoiMzE5Nzk1NDkxNzg5MjktUG9RODNPX0twcDNTQmxPM215Z3E5aVdyNnNxblZ3IiwiY2lkIjoiaUFqckRzTHlGX0VTdEdJYU40NU5nUSIsImxpZCI6InQyX2JjMzc5dzY1dCIsImFpZCI6InQyX2JjMzc5dzY1dCIsImxjYSI6MTY4NDE0ODc4NzQyMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.PjXYz1SuHZ7Jw4KiMXUP1uGnqfMdwbrXtR7ZCwjgUsyA13YD56Nm-QftKSMLBF03S6ZrIeLrNkKM1fT3IROcnYUB8hzNP62MrzJWKR6cJoLUwf032E2-Nm8LRqaA3lUYoCCbzKEnTWC8iNw-4voqxZbudhUonR3-Zun3Z-PFDjHdU9pQZLhZl9RB3325QK9EHO9qLrNLlLum0Nu0OqTCyj84Gezxfi7sxkeMet08A9q2gnEWQy5OeOfG7YHMXF0OypUe41yzqpFVzHVsMofkXdQmENLSalH02JsXRu-3BsRMCLVVOxnRsNF4h48aWCguXEE3w87UJqmhGK3qs3nnlg';

        const options = {
          method: 'GET',
          url: 'https://oauth.reddit.com/hot',
          headers: {
              Authorization: "Bearer " + token,
          }
        }

        if (after) {
          options.url += `?after=${after}`;
        }
          
        axios.request(options).then(function (res) {
          const data = res.data.data.children;
          const newAfter = res.data.data.after;
          const newSubredditsData = [...subredditsData, ...data];
          // console.log(newSubredditsData, "new in hot after set")
          setSubredditsData(newSubredditsData);
          // console.log(newSubredditsData, "HOT DATA")
          // setImageUrl(newSubredditsData.map(item => item.data));
          setAfter(newAfter);
        }).catch(function (error) {
          console.error(error);
        });
      };
      fetchHot();
    } else if (news === true) {
      // console.log(subredditsData, "in news")
      // console.log(newSubredditsData, "new in news")
      // console.log("news fetch", news);
      // console.log("news ok");
      const fetchNews = (after = null) => {
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTc3NDYxLjQ1MTgyMiwiaWF0IjoxNjg0NDkxMDYxLjQ1MTgyMiwianRpIjoiMzE5Nzk1NDkxNzg5MjktUG9RODNPX0twcDNTQmxPM215Z3E5aVdyNnNxblZ3IiwiY2lkIjoiaUFqckRzTHlGX0VTdEdJYU40NU5nUSIsImxpZCI6InQyX2JjMzc5dzY1dCIsImFpZCI6InQyX2JjMzc5dzY1dCIsImxjYSI6MTY4NDE0ODc4NzQyMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.PjXYz1SuHZ7Jw4KiMXUP1uGnqfMdwbrXtR7ZCwjgUsyA13YD56Nm-QftKSMLBF03S6ZrIeLrNkKM1fT3IROcnYUB8hzNP62MrzJWKR6cJoLUwf032E2-Nm8LRqaA3lUYoCCbzKEnTWC8iNw-4voqxZbudhUonR3-Zun3Z-PFDjHdU9pQZLhZl9RB3325QK9EHO9qLrNLlLum0Nu0OqTCyj84Gezxfi7sxkeMet08A9q2gnEWQy5OeOfG7YHMXF0OypUe41yzqpFVzHVsMofkXdQmENLSalH02JsXRu-3BsRMCLVVOxnRsNF4h48aWCguXEE3w87UJqmhGK3qs3nnlg';

        const options = {
          method: 'GET',
          url: 'https://oauth.reddit.com/new',
          headers: {
              Authorization: "Bearer " + token,
          }
        }

        if (after) {
          options.url += `?after=${after}`;
        }
          
        axios.request(options).then(function (res) {
          const data = res.data.data.children;
          const newAfter = res.data.data.after;
          const newSubredditsData = [...subredditsData, ...data];
          // console.log(newSubredditsData, "new in news after set")
          setSubredditsData(newSubredditsData);
          // console.log(newSubredditsData, "NEWs DATA")
          // setImageUrl(newSubredditsData.map(item => item.data));
          setAfter(newAfter);
        }).catch(function (error) {
          console.error(error);
        });
      };
      fetchNews();
    }
  }, [best, hot, news]);

const handleLoadMore = () => {
  if (after) {
    fetchNew(after);
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

      {best === true &&
        <FlatList
          data={subredditsData}
          renderItem={({ item }) => <Card subredditsData={item} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
        />
      }
      {hot === true &&
        <FlatList
          data={subredditsData}
          renderItem={({ item }) => <Card subredditsData={item} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
        />
      }
      {news === true &&
        <FlatList
          data={subredditsData}
          renderItem={({ item }) => <Card subredditsData={item} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
        />
      }
    </>
  );
}

export default HomePage;
