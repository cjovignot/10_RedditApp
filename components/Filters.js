import React from "react";
import { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Banner, IconButton } from 'react-native-paper';


function Filters({ best, hot, news, onBestChange, onHotChange, onNewsChange }) {
    // Use the callback functions to update the values
  
    const handleBestPress = () => {
      // Call the callback function to update the value
      onBestChange(true);
      // Reset other values if needed
      onHotChange(false);
      onNewsChange(false);
    };
  
    const handleHotPress = () => {
      // Call the callback function to update the value
      onHotChange(true);
      // Reset other values if needed
      onBestChange(false);
      onNewsChange(false);
    };
  
    const handleNewsPress = () => {
      // Call the callback function to update the value
      onNewsChange(true);
      // Reset other values if needed
      onBestChange(false);
      onHotChange(false);
    };


  return (
      <View style={styles.banner}>


        {best === true &&
        <>
          <IconButton
            icon="rocket-launch-outline"
            mode={best ? 'outlined' : undefined}
            size={20}
          /><Text style={styles.text}>Best</Text>
        </>
        }
        {best === false &&
        <>
          <IconButton
            icon="rocket-launch-outline"
            size={20}
            onPress={handleBestPress}
          /><Text style={styles.text}>Best</Text>
        </>
        }


        {hot === true &&
        <>
        <IconButton
          icon="fire"
          mode='outlined'
          size={20}
        /><Text style={styles.text}>Hot</Text>
        </>
        }
        {hot === false &&
        <>
        <IconButton
          icon="fire"
          size={20}
          onPress={handleHotPress}
        /><Text style={styles.text}>Hot</Text>
        </>
        }

        {news === true &&
        <>
        <IconButton
          icon="decagram-outline"
          mode='outlined'
          size={20}
        /><Text style={styles.text}>New</Text>
        </>
        }
        {news === false &&
        <>
        <IconButton
          icon="decagram-outline"
          size={20}
          onPress={handleNewsPress}
        /><Text style={styles.text}>New</Text>
        </>
        }
        
      </View>
  );
}

const styles = StyleSheet.create({
  banner: {
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
  },
  text: {
    alignSelf: 'center',
    marginLeft: -30,
  }
});

export default Filters;
