import * as React from 'react';
import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Text, IconButton } from 'react-native-paper';



const MyComponent = ({ subredditsData }) => {

  return (
    <Card.Actions style={[{width: 160}]}>

        <IconButton
          icon="chevron-double-down"
          size={20}
          // onPress={() =>
          //   navigation.navigate("Postlist", {
          //     subreddit: subredditsData?.data?.subreddit,
          //   })
          // }
        />
        <Text variant="titleSmall">{subredditsData.data.score}</Text>
        <IconButton
          icon="chevron-double-up"
          size={20}
          // onPress={() =>
          //   navigation.navigate("Postlist", {
          //     subreddit: subredditsData?.data?.subreddit,
          //   })
          // }
        />

    </Card.Actions>
  )
};

const styles = StyleSheet.create({
});

export default MyComponent;