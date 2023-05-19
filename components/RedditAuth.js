import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";
import { Buffer } from "buffer";
import Toast from "react-native-root-toast";
import {REDIRECT_URI, REDDIT_CLIENT_ID, REDDIT_SECRET_KEY} from '@env';

WebBrowser.maybeCompleteAuthSession();

async function exchangeCodeForToken(code, redirectUri) {
  try {
    const authString = `${REDDIT_CLIENT_ID}:${REDDIT_SECRET_KEY}`;
    const encodedAuthString = Buffer.from(authString).toString("base64");

    const response = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encodedAuthString}`,
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
    });

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.error("Failed to fetch access token", error);
    return null;
  }
}

const redirectUri = makeRedirectUri({
  native: REDIRECT_URI,
  proxy: "true",
});

console.log(redirectUri);

const discovery = {
  authorizationEndpoint: "https://www.reddit.com/api/v1/authorize.compact",
  tokenEndpoint: "https://www.reddit.com/api/v1/access_token",
};

export default function App({ FetchDetails, setData, data }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  async function checkUserToken() {
    const token = await AsyncStorage.getItem("UserToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }

  React.useEffect(() => {
    checkUserToken();
  }, []);
  async function Logout() {
    try {
      await AsyncStorage.removeItem("UserToken");
      await AsyncStorage.removeItem("UserCode");
      setIsLoggedIn(false);
      setData(undefined);
      console.log("JESUISLA");
      console.log("JESUISPASLA");
    } catch (error) {
      console.error("Error in Logout:", error);
    }
    Toast.show("Logged Out!", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 5,
    });
  }

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: REDDIT_CLIENT_ID,
      scopes: ["identity"],
      redirectUri: redirectUri,
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log(code);
      AsyncStorage.setItem("UserCode", code);

      (async () => {
        const token = await exchangeCodeForToken(code, redirectUri);
        console.log(token);
        AsyncStorage.setItem("UserToken", token);

        fetch("https://oauth.reddit.com/api/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Display Name: ", data.name);
            AsyncStorage.setItem("UserName", data.name);
            FetchDetails();
            setIsLoggedIn(true);
            Toast.show("Welcome back, " + data.name, {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 5,
            });
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      })();
    }
  }, [response]);

  return (
    <>
      {!isLoggedIn && (
        <Button
          disabled={!request}
          title="Login"
          onPress={() => {
            promptAsync();
          }}
        />
      )}
      {isLoggedIn && (
        <Button
          disabled={!request}
          title="Logout"
          onPress={() => {
            Logout();
          }}
        />
      )}
    </>
  );
}
