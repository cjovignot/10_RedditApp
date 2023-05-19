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
      console.log(subredditsData, "in best")
      console.log(newSubredditsData, "new in best")
      console.log("best fetch", best);
      console.log("best ok");
      const fetchData = (after = null) => {
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NDkxMjA0LCJpYXQiOjE2ODQ0MDQ4MDQsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LVJ6N1lqVzZuUENFZUFydUF2Y3EyelFqU3FYQjRtUSIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.lz6ChgLuUy8MxKl47CxUrYJpetuJosJX-U58t9Yij0NkZH4qPyMjs5i0ux9YvsovQ48w0WMjcbQuUK_rYiT_1cx5ePCkqN3Ev1r1O-tzbMxMwUXEGq2yQrXq4PWlIgjIpvTPs2hlFlRa82HOda_d5EipgZLkBWgJXzBWCcpYi4C0M_GccclDwlIfxhTn4Ewh64ZtmZ4o_SuXIkFQMHatsR55x-vXKCuYRMlmj6Lw3CvNt-pboECgRC7mrFdnOzXcFPMyHpHMwtQU9ak0qk3TjbYXYzyiixNabLet0tSexfARzvfMo0gIkIvsyNVNuLG2PGRAAGNPhxWZX_bDVxxeDw';

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
          console.log(newSubredditsData, "new in best after set")
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
      console.log(subredditsData, "in hot")
      console.log(newSubredditsData, "new in hot")
      console.log("hot fetch", hot);
      console.log("hot ok");
      const fetchHot = (after = null) => {
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NDkxMjA0LCJpYXQiOjE2ODQ0MDQ4MDQsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LVJ6N1lqVzZuUENFZUFydUF2Y3EyelFqU3FYQjRtUSIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.lz6ChgLuUy8MxKl47CxUrYJpetuJosJX-U58t9Yij0NkZH4qPyMjs5i0ux9YvsovQ48w0WMjcbQuUK_rYiT_1cx5ePCkqN3Ev1r1O-tzbMxMwUXEGq2yQrXq4PWlIgjIpvTPs2hlFlRa82HOda_d5EipgZLkBWgJXzBWCcpYi4C0M_GccclDwlIfxhTn4Ewh64ZtmZ4o_SuXIkFQMHatsR55x-vXKCuYRMlmj6Lw3CvNt-pboECgRC7mrFdnOzXcFPMyHpHMwtQU9ak0qk3TjbYXYzyiixNabLet0tSexfARzvfMo0gIkIvsyNVNuLG2PGRAAGNPhxWZX_bDVxxeDw';

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
          console.log(newSubredditsData, "new in hot after set")
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
      console.log(subredditsData, "in news")
      console.log(newSubredditsData, "new in news")
      console.log("news fetch", news);
      console.log("news ok");
      const fetchNews = (after = null) => {
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NDkxMjA0LCJpYXQiOjE2ODQ0MDQ4MDQsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LVJ6N1lqVzZuUENFZUFydUF2Y3EyelFqU3FYQjRtUSIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.lz6ChgLuUy8MxKl47CxUrYJpetuJosJX-U58t9Yij0NkZH4qPyMjs5i0ux9YvsovQ48w0WMjcbQuUK_rYiT_1cx5ePCkqN3Ev1r1O-tzbMxMwUXEGq2yQrXq4PWlIgjIpvTPs2hlFlRa82HOda_d5EipgZLkBWgJXzBWCcpYi4C0M_GccclDwlIfxhTn4Ewh64ZtmZ4o_SuXIkFQMHatsR55x-vXKCuYRMlmj6Lw3CvNt-pboECgRC7mrFdnOzXcFPMyHpHMwtQU9ak0qk3TjbYXYzyiixNabLet0tSexfARzvfMo0gIkIvsyNVNuLG2PGRAAGNPhxWZX_bDVxxeDw';

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
          console.log(newSubredditsData, "new in news after set")
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
