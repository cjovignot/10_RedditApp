import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = () => (
  <Card style={styles.card}>
    {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
    <Card.Content style={styles.cardHeader}>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.Image}/>
    <Card.Actions style={styles.actions}>
      <Button>Explore</Button>
      <Button>Follow</Button>
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 4,
    },
    cardHeader: {
        width: 340,
    },
    Image: {
        height: 300,
        margin: 10,
    },
});

export default MyComponent;