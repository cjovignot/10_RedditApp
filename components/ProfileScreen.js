import React, { useState, useEffect } from "react";
import {View, Text, Image, ScrollView, TextInput} from 'react-native';
import axios from 'axios';
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Avatar } from 'react-native-paper';
import RedditLogin from "./RedditAuth"


function ProfileScreen() {
  let [data , setData] = useState(undefined)
  
  console.log(formattedDate); // Output: "Dec 15, 2021"
  
  
  
  
  function FetchDetails() {
    
    
    axios({
      method: 'get',
      url: `https://oauth.reddit.com/api/v1/me`,
      headers: {
        'Authorization': `bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTc3NDYxLjQ1MTgyMiwiaWF0IjoxNjg0NDkxMDYxLjQ1MTgyMiwianRpIjoiMzE5Nzk1NDkxNzg5MjktUG9RODNPX0twcDNTQmxPM215Z3E5aVdyNnNxblZ3IiwiY2lkIjoiaUFqckRzTHlGX0VTdEdJYU40NU5nUSIsImxpZCI6InQyX2JjMzc5dzY1dCIsImFpZCI6InQyX2JjMzc5dzY1dCIsImxjYSI6MTY4NDE0ODc4NzQyMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.PjXYz1SuHZ7Jw4KiMXUP1uGnqfMdwbrXtR7ZCwjgUsyA13YD56Nm-QftKSMLBF03S6ZrIeLrNkKM1fT3IROcnYUB8hzNP62MrzJWKR6cJoLUwf032E2-Nm8LRqaA3lUYoCCbzKEnTWC8iNw-4voqxZbudhUonR3-Zun3Z-PFDjHdU9pQZLhZl9RB3325QK9EHO9qLrNLlLum0Nu0OqTCyj84Gezxfi7sxkeMet08A9q2gnEWQy5OeOfG7YHMXF0OypUe41yzqpFVzHVsMofkXdQmENLSalH02JsXRu-3BsRMCLVVOxnRsNF4h48aWCguXEE3w87UJqmhGK3qs3nnlg` 
      }    }).then((response) => {
        setData(response.data);
        console.log(data.icon_img);
      });
    }
    
    useEffect(() => {
      FetchDetails();
    }, [])
    
    if (data === undefined) {
      return <ActivityIndicator animating={true} color={MD2Colors.red800} />  
    }

    const timestamp = data.created_utc;
    const date = new Date(timestamp * 1000);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Avatar.Image size={128} source={{
              uri: `${data.icon_img.slice(0, data.icon_img.indexOf('?'))}`,
            }} />
        <Text>This is the profile screen</Text>
        <Text>{data.subreddit.title}</Text>
        <Text>{data.subreddit.display_name_prefixed}</Text>
        <Text>{data.subreddit.subscribers} abonnés</Text>
        
          
            
          
        <Text>{data.subreddit.public_description}</Text>
        <Text>{data.link_karma} karma</Text>
        <Text>{formattedDate}</Text>


      <RedditLogin/>
        
        
      </View>
    );
}

export default ProfileScreen;
