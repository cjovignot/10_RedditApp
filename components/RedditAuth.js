import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';
import { Buffer } from "buffer";

WebBrowser.maybeCompleteAuthSession();

async function exchangeCodeForToken(code) {
  try {
    const authString = `${'iAjrDsLyF_EStGIaN45NgQ'}:${'yhkmkg2hSYuPs0wKK60pkbr3zhWXGw'}`;
    const encodedAuthString = Buffer.from(authString).toString('base64');

    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedAuthString}`,
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=exp://localhost:190000/--/*`,
    });

    if (response.status !== 200) {
      console.log(await response.text());
      throw new Error('Failed to fetch access token');
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`Error: ${data.error}`);
    }

    return data.access_token;
  } catch (error) {
    console.error('Failed to fetch access token', error);
    return null;
  }
}




const discovery = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
  tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'iAjrDsLyF_EStGIaN45NgQ',
      scopes: ['identity'],
      redirectUri: 'exp://localhost:190000/--/*',
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;   
      AsyncStorage.setItem('UserCode', code);
      
       (async () => {
      const token = await exchangeCodeForToken(code);
        AsyncStorage.setItem('UserToken', token);
      
      fetch('https://oauth.reddit.com/api/v1/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Display Name: ', data.name);
        })
        .catch(error => {
          console.error('Error: ', error);
        });
    })();

    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
