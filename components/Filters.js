import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Banner, IconButton } from 'react-native-paper';


function Filters() {
  
  const [visible, setVisible] = React.useState(true);

  return (
      <Banner visible={visible} style={styles.banner}>
      <IconButton
        icon="rocket-launch-outline"
        mode='outlined'
        size={20}
      />
      <IconButton
        icon="fire"
        mode='outlined'
        size={20}
      />
      <IconButton
        icon="decagram-outline"
        mode='outlined'
        size={20}
      />
      </Banner>
  );
}

const styles = StyleSheet.create({
  banner: {
      height: 85,
  },
});

export default Filters;
