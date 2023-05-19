import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";
import { Buffer } from "buffer";
import Toast from "react-native-root-toast";

WebBrowser.maybeCompleteAuthSession();

async function exchangeCodeForToken(code, redirectUri) {
  try {
    const authString = `${"0vmtawCIYUhfp9ceF-6v9Q"}:${"m3B8Obw0XXjbOdTw_MT2-iVj6Nfh0w"}`;
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
  native: "exp://localhost:19000/--/redirect",
  proxy: "true",
});

console.log(redirectUri);

const discovery = {
  authorizationEndpoint: "https://www.reddit.com/api/v1/authorize.compact",
  tokenEndpoint: "https://www.reddit.com/api/v1/access_token",
};

export default function App({ FetchDetails, setData, data }) {
  async function Logout() {
    try {
      await AsyncStorage.removeItem("UserToken");
      await AsyncStorage.removeItem("UserCode");
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
      clientId: "0vmtawCIYUhfp9ceF-6v9Q",
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
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
      <Button
        disabled={!request}
        title="Logout"
        onPress={() => {
          Logout();
        }}
      />
    </>
  );
}
