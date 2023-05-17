import * as React from 'react';
import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Text, IconButton } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import {decode} from 'html-entities';

import Icon from '@mdi/react';
import { mdiChevronDoubleDown } from '@mdi/js';
import { mdiChevronDoubleUp } from '@mdi/js';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = ({ subredditsData }) => {
  const { width } = useWindowDimensions();

  // console.log(decode(subredditsData.data.media_metadata?.p?.u))

  const source = {
    html: decode(subredditsData.data.selftext_html)
  };

  return (
    <Card style={styles.card}>
    
      <IconButton icon="bell-outline" size={25} style={[{justifyContent: 'flex-start'}]}/>
      <Card.Content>
        
        <Text variant="titleSmall"style={[{color: 'grey'}, {fontStyle: 'italic'}]}>{subredditsData.data.subreddit_name_prefixed}</Text>
        <Text variant="titleLarge" numberOfLines={2}  style={[{fontWeight: 'bold'}]}>{subredditsData.data.title}</Text>
        
        {subredditsData.data.preview &&
          <Card.Cover style={[{height: 300}, {width: 'auto'}, {marginTop: 20}]} source={{uri: decode(subredditsData.data.preview?.images[0]?.source?.url)}}/>
        }

        {subredditsData.data.selftext_html &&
          <RenderHtml contentWidth={width} source={source}/>
        }

        {subredditsData.data.is_gallery && subredditsData.data.is_gallery === true && (
          <Card.Cover source={{ uri: decode(subredditsData.data.media_metadata[Object.keys(subredditsData.data.media_metadata)[0]].p[3].u) }}/>
        )}
        
        {subredditsData.data.is_gallery && subredditsData.data.is_gallery === true && (
          <Card.Cover source={{ uri: decode(subredditsData.data.media_metadata[Object.keys(subredditsData.data.media_metadata)[0]].p[3].u) }}/>
        )}





      </Card.Content>
      
      <Card.Actions style={[{width: 160}]}>

        <IconButton icon="chevron-double-down" size={20} />
        <Text variant="titleSmall">{subredditsData.data.score}</Text>
        <IconButton icon="chevron-double-up" size={20} />

        {/* <Button>Explore</Button> */}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        borderRadius: 4,
    },
});

export default MyComponent;