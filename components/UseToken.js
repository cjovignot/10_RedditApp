import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useToken() {
  const [token, setToken] = useState(null);

  async function fetchToken() {
    const storedToken = await AsyncStorage.getItem("UserToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }

  useEffect(() => {
    fetchToken();
  }, []);

  return token;
}
