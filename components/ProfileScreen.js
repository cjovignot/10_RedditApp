import React from "react";
import {View, Text, Image, ScrollView, TextInput} from 'react-native';
import axios from 'axios';


function ProfileScreen() {

  

  function FetchDetails() {
  

    axios({
      method: 'get',
      url: `https://oauth.reddit.com/api/v1/me`,
      headers: {
        'Authorization': `bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0MzEwMzEyLCJpYXQiOjE2ODQyMjM5MTIsImp0aSI6IjY0OTY1MDQzMTQ4OS0xcDhEaVd5bWdITGZQamNsWHZsdnBXUFBDUW9uUlEiLCJjaWQiOiI1Ny1haVgxQWhlUnlsSE9pbXI5ZTR3IiwibGlkIjoidDJfOGFnMTNkMzUiLCJhaWQiOiJ0Ml84YWcxM2QzNSIsImxjYSI6MTYwMTQ1NzM1NzAwMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MifQ.oj1B6um6O90TPVB1VN6CyFoye6s8I6Ac6XFABqGNmuImzOJWvkQOS8JXOi0l3Iqgb-X8IUl-bRVTf5q_rn33OfxiQTJDoCiimxSlbs_h-PpHOMrDyPxuGUj7R7Fs2hQZB8hOvn_6y2xJhbtHPaZ_qPCVvLdV-8PoSO9aCim8q9Kw4ueIFJSX1eI_s6Cdr8HtyXNWun5xQMkLXKGceyp4oN4S_TLdycoIPZNomcEGwLx7bxHgbs1-lgeth8WNLmI65Lxcvu1t1TaaAbaLctT2otZTQyDd_ySvw5hCgkJ9zyjKgoOwmBIaPiH8K6nIsu3wqpuX9CZyq0Nb-LwXzp9uzw` 
      }    }).then((response) => {
      console.log(response.data);
      data = response.data
    });
  }
  FetchDetails();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the profile screen</Text>
      <Text>{data.name}</Text>
      <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        />
      <Text>Description</Text>
      
    </View>
  );
}

export default ProfileScreen;
