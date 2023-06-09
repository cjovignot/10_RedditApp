import * as React from 'react';
import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Text, IconButton } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import {decode} from 'html-entities';
import { Video, ResizeMode } from 'expo-av';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import VoteButtons from '../components/VoteButtons';
import Comments from '../components/Comments';

import { ScrollView } from 'react-native-gesture-handler';


const MyComponent = () => {
    const route = useRoute();
    const subredditsData = route.params.subredditsData;
  
    console.log(subredditsData);

  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});


  const source = {
    html: decode(subredditsData?.data?.selftext_html)
  };

  return (
    <ScrollView>
      <Card style={styles.card}>
      
        <IconButton icon="bell-outline" size={25} style={[{justifyContent: 'flex-start'}]}/>
        <Card.Content>
          
          <Text variant="titleSmall" style={[{color: 'grey'}, {fontStyle: 'italic'}]}>{subredditsData?.data?.subreddit_name_prefixed}</Text>
          <Text variant="titleLarge" numberOfLines={2} style={[{fontWeight: 'bold'}]}>{subredditsData?.data?.title}</Text>
          
          {subredditsData?.data?.preview && subredditsData?.data?.is_video === false &&
            <Card.Cover style={[{height: 350}, {width: 'auto'}, {marginTop: 20}]} source={{uri: decode(subredditsData?.data?.preview?.images[0]?.source?.url)}}/>
          }

          {subredditsData?.data?.selftext_html &&
            <RenderHtml contentWidth={width} source={source} style={[{marginTop: 20}]}/>
          }

          {subredditsData?.data?.is_gallery && subredditsData?.data?.is_gallery === true && (
           <Card.Cover style={[{height: 350}, {width: 'auto'}, {marginTop: 20}]} source={{ uri: decode(subredditsData?.data?.media_metadata[Object.keys(subredditsData?.data?.media_metadata)[0]]?.p[3]?.u) }}/>
          )}

          {subredditsData?.data?.is_video && subredditsData?.data?.is_video === true && (
            <Video
              ref={video}
              style={styles.video}
              source={{
                uri: subredditsData?.data?.secure_media?.reddit_video?.hls_url,
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              isMuted={false}
              onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
          )}

          <VoteButtons subredditsData={subredditsData}/>

        </Card.Content>


      </Card>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
    card: {
      marginTop: 10,
      borderRadius: 4,
    },
    video: {
      height: 350,
      width: 350,
      marginTop: 20,
    }
});

export default MyComponent;