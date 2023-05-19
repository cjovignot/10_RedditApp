import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import axios from "axios";

const MyComponent = ({ subredditsData }) => {
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  const upVote = () => {
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTY4OTQ1Ljc2NDAzMywiaWF0IjoxNjg0NDgyNTQ1Ljc2NDAzMiwianRpIjoiMzAyODI3NDgzMjM4LUNKYVhYZ0FsYkpiekJrR1lsMGdoYTItM1V1bVNtUSIsImNpZCI6IkxtS1kyQmJGSnNwaDNmZ29oZXUwTXciLCJsaWQiOiJ0Ml8zdjQ3bnhpZSIsImFpZCI6InQyXzN2NDdueGllIiwibGNhIjoxNTU5Mjc3MDQyMTE3LCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyIsImZsbyI6OX0.mhCVuz_k56qUlB5iaXVTEMy76ba6jwxlnnOaJVwVfdvd_cI8Cd7UbK_LdksPhUBlWswJV-rgowPHTLvATAnCXerhHyX-oFW8wNwrjVVvKuhMTwjFCJpLv3rB40gz7oBfqgqiShmwmyf54koET8GzY7aqZeb6fIXFjPmjXrVZl1iG3iXFjNtyz7jG0dbjlyflfQzs7dR2QfIuywmx0LahZyEkXwIoZd9NnFSVbVzfxwEh2LtKp1nN4PNq0QlukcM7AbQeCQEVQQU7svcUvj_VzNp9_FUWGo-p-b3NDT36Pfj4FMM_jIdocXdEZ_Xq1VFp43kqWYKVy95AHX-cttRwOQ";
    const id = subredditsData.data.name;
    const dir = 1;

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
      const token =
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTY4OTQ1Ljc2NDAzMywiaWF0IjoxNjg0NDgyNTQ1Ljc2NDAzMiwianRpIjoiMzAyODI3NDgzMjM4LUNKYVhYZ0FsYkpiekJrR1lsMGdoYTItM1V1bVNtUSIsImNpZCI6IkxtS1kyQmJGSnNwaDNmZ29oZXUwTXciLCJsaWQiOiJ0Ml8zdjQ3bnhpZSIsImFpZCI6InQyXzN2NDdueGllIiwibGNhIjoxNTU5Mjc3MDQyMTE3LCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyIsImZsbyI6OX0.mhCVuz_k56qUlB5iaXVTEMy76ba6jwxlnnOaJVwVfdvd_cI8Cd7UbK_LdksPhUBlWswJV-rgowPHTLvATAnCXerhHyX-oFW8wNwrjVVvKuhMTwjFCJpLv3rB40gz7oBfqgqiShmwmyf54koET8GzY7aqZeb6fIXFjPmjXrVZl1iG3iXFjNtyz7jG0dbjlyflfQzs7dR2QfIuywmx0LahZyEkXwIoZd9NnFSVbVzfxwEh2LtKp1nN4PNq0QlukcM7AbQeCQEVQQU7svcUvj_VzNp9_FUWGo-p-b3NDT36Pfj4FMM_jIdocXdEZ_Xq1VFp43kqWYKVy95AHX-cttRwOQ";
      const id = subredditsData.data.name;
      const dir = 0;

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
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTY4OTQ1Ljc2NDAzMywiaWF0IjoxNjg0NDgyNTQ1Ljc2NDAzMiwianRpIjoiMzAyODI3NDgzMjM4LUNKYVhYZ0FsYkpiekJrR1lsMGdoYTItM1V1bVNtUSIsImNpZCI6IkxtS1kyQmJGSnNwaDNmZ29oZXUwTXciLCJsaWQiOiJ0Ml8zdjQ3bnhpZSIsImFpZCI6InQyXzN2NDdueGllIiwibGNhIjoxNTU5Mjc3MDQyMTE3LCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyIsImZsbyI6OX0.mhCVuz_k56qUlB5iaXVTEMy76ba6jwxlnnOaJVwVfdvd_cI8Cd7UbK_LdksPhUBlWswJV-rgowPHTLvATAnCXerhHyX-oFW8wNwrjVVvKuhMTwjFCJpLv3rB40gz7oBfqgqiShmwmyf54koET8GzY7aqZeb6fIXFjPmjXrVZl1iG3iXFjNtyz7jG0dbjlyflfQzs7dR2QfIuywmx0LahZyEkXwIoZd9NnFSVbVzfxwEh2LtKp1nN4PNq0QlukcM7AbQeCQEVQQU7svcUvj_VzNp9_FUWGo-p-b3NDT36Pfj4FMM_jIdocXdEZ_Xq1VFp43kqWYKVy95AHX-cttRwOQ";
    const id = subredditsData.data.name;
    const dir = -1;

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
      const token =
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTY4OTQ1Ljc2NDAzMywiaWF0IjoxNjg0NDgyNTQ1Ljc2NDAzMiwianRpIjoiMzAyODI3NDgzMjM4LUNKYVhYZ0FsYkpiekJrR1lsMGdoYTItM1V1bVNtUSIsImNpZCI6IkxtS1kyQmJGSnNwaDNmZ29oZXUwTXciLCJsaWQiOiJ0Ml8zdjQ3bnhpZSIsImFpZCI6InQyXzN2NDdueGllIiwibGNhIjoxNTU5Mjc3MDQyMTE3LCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyIsImZsbyI6OX0.mhCVuz_k56qUlB5iaXVTEMy76ba6jwxlnnOaJVwVfdvd_cI8Cd7UbK_LdksPhUBlWswJV-rgowPHTLvATAnCXerhHyX-oFW8wNwrjVVvKuhMTwjFCJpLv3rB40gz7oBfqgqiShmwmyf54koET8GzY7aqZeb6fIXFjPmjXrVZl1iG3iXFjNtyz7jG0dbjlyflfQzs7dR2QfIuywmx0LahZyEkXwIoZd9NnFSVbVzfxwEh2LtKp1nN4PNq0QlukcM7AbQeCQEVQQU7svcUvj_VzNp9_FUWGo-p-b3NDT36Pfj4FMM_jIdocXdEZ_Xq1VFp43kqWYKVy95AHX-cttRwOQ";
      const id = subredditsData.data.name;
      const dir = 0;

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
