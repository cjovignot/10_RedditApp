import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Banner } from 'react-native-paper';


function Filters() {
  
  const [visible, setVisible] = React.useState(true);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Banner visible={visible} style={styles.banner}>
          This  will be the filter bar
      </Banner>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
      padding: 10,
      width: 373,
      backgroundColor: 'grey',
  },
});

export default Filters;
