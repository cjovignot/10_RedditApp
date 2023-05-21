import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyComponent = ({ subredditsData }) => {
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  const upVote = async () => {
    const token = await AsyncStorage.getItem("UserToken");
    console.log(token)
    const id=subredditsData.data.name
    const dir=1

    const options = {
      method: "POST",
      url: "https://oauth.reddit.com/api/vote",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      data: `id=${id}&dir=${dir}`,
    };

    if (upVoted === false) {
      axios
        .request(options)
        .then((response) => {
          setUpVoted(true);
          console.log(response.data);
          console.log("upVote successfull", subredditsData.data.score + 1);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (upVoted === true) {
      const id=subredditsData.data.name
      const dir=0
  
      const options = {
        method: "POST",
        url: "https://oauth.reddit.com/api/vote",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        data: `id=${id}&dir=${dir}`,
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          setUpVoted(false);
          console.log("Unvote successfull", subredditsData.data.score);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const downVote = async () => {
    const token = await AsyncStorage.getItem("UserToken");
    console.log(token)
    const id=subredditsData.data.name
    console.log(id)
    const dir=-1

    const options = {
      method: "POST",
      url: "https://oauth.reddit.com/api/vote",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      data: `id=${id}&dir=${dir}`,
    };

    if (downVoted === false) {
      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          setDownVoted(true);
          console.log("downVote successfull", subredditsData.data.score - 1);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (downVoted === true) {
      const id=subredditsData.data.name
      const dir=0
  
      const options = {
        method: "POST",
        url: "https://oauth.reddit.com/api/vote",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        data: `id=${id}&dir=${dir}`,
      };

      axios
        .request(options)
        .then((response) => {
          setDownVoted(false);
          console.log(response.data);
          console.log("UnDownVote successfull", subredditsData.data.score);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Card.Actions>
      {upVoted === true && <IconButton icon="chevron-double-down" size={20} />}
      {upVoted === false && (
        <IconButton
          icon="chevron-double-down"
          size={20}
          onPress={() => downVote()}
        />
      )}

      {upVoted === false && downVoted === false && (
        <Text variant="titleSmall">{subredditsData.data.score}</Text>
      )}

      {upVoted === true && downVoted === false && (
        <Text variant="titleSmall">{subredditsData.data.score + 1}</Text>
      )}

      {downVoted === true && upVoted === false && (
        <Text variant="titleSmall">{subredditsData.data.score - 1}</Text>
      )}

      {downVoted === true && (
        <IconButton mode="outlined" icon="chevron-double-up" size={20} />
      )}
      {downVoted === false && (
        <IconButton
          icon="chevron-double-up"
          size={20}
          onPress={() => upVote()}
        />
      )}
    </Card.Actions>
  );
};

const styles = StyleSheet.create({});

export default MyComponent;
