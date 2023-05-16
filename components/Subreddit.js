import React, { useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";

const api = axios.create({
  baseURL: "https://oauth.reddit.com",
  headers: {
    Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0MjQ4NzUyLCJqdGkiOiIzMDI4Mjc0ODMyMzgtNnQ4bjd0YlhIaFJoTWtwTEM0eS1lM0VhSFVRQkh3IiwiY2lkIjoiTG1LWTJCYkZKc3BoM2Znb2hldTBNdyIsImxpZCI6InQyXzN2NDdueGllIiwiYWlkIjoidDJfM3Y0N254aWUiLCJsY2EiOjE1NTkyNzcwNDIxMTcsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIn0.zrPYDlToGreGtvzgFUkcvje7f4VT51VUghPw6nVlYnCQe_ExDLejowPnajnUhRGTTZGOp02UPI9JMaLIVuq1ayWIErO9flpOo5Rea7IguhFJ_KBcqHiM43qVRidzoXtUBypUiYEfNvJcR-V-8DEMWG1jtrbR57jyiKBWm5t8Yi7OpjONZhKdYBEcR4UnzOfznPmVLaY7gvWfY3eU1xzEWG7UG3fURJ45dYYafmFessZc9eLC52z4Jh0wYgK6FiOgbpBPKBfUdmxOSh5YCFJ9k5LdRxS4DH72WXk8edieqlVoQVS1e-q2tAj9h9-qpqFjFwC3EGK2ZX3U6mdMSqcG1w"}`, // replace with your access token
  },
});

function SecondScreen() {
  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/subreddits/mine/subscriber");
        console.log(response.data.data.children);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the second screen</Text>
    </View>
  );
}

export default SecondScreen;
