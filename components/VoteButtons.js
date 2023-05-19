import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import axios from "axios";

const MyComponent = ({ subredditsData }) => {
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTc3NDYxLjQ1MTgyMiwiaWF0IjoxNjg0NDkxMDYxLjQ1MTgyMiwianRpIjoiMzE5Nzk1NDkxNzg5MjktUG9RODNPX0twcDNTQmxPM215Z3E5aVdyNnNxblZ3IiwiY2lkIjoiaUFqckRzTHlGX0VTdEdJYU40NU5nUSIsImxpZCI6InQyX2JjMzc5dzY1dCIsImFpZCI6InQyX2JjMzc5dzY1dCIsImxjYSI6MTY4NDE0ODc4NzQyMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.PjXYz1SuHZ7Jw4KiMXUP1uGnqfMdwbrXtR7ZCwjgUsyA13YD56Nm-QftKSMLBF03S6ZrIeLrNkKM1fT3IROcnYUB8hzNP62MrzJWKR6cJoLUwf032E2-Nm8LRqaA3lUYoCCbzKEnTWC8iNw-4voqxZbudhUonR3-Zun3Z-PFDjHdU9pQZLhZl9RB3325QK9EHO9qLrNLlLum0Nu0OqTCyj84Gezxfi7sxkeMet08A9q2gnEWQy5OeOfG7YHMXF0OypUe41yzqpFVzHVsMofkXdQmENLSalH02JsXRu-3BsRMCLVVOxnRsNF4h48aWCguXEE3w87UJqmhGK3qs3nnlg';

  const upVote = () => {
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

  const downVote = () => {
    const id=subredditsData.data.name
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
