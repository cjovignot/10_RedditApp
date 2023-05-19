import * as React from "react";
import { View, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView } from "react-native";
import { Searchbar } from "react-native-paper";
import axios from "axios";

const SearchComponent = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [redditNames, setRedditNames] = React.useState([]);

  const onChangeSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const res = await axios.get(
          `https://www.reddit.com/api/search_reddit_names.json?query=${query}`,
          {
            params: {
              query: query,
              exact: false,
              limit: 5,
            },
          }
        );
        setRedditNames(res.data.names);
      } catch (error) {
        console.error(error);
      }
    } else {
      setRedditNames([]);
    }
  };

  const handlePress = (redditName) => {
    navigation.navigate("Postlist", { subreddit: redditName });
    setSearchQuery("");
    setRedditNames([]);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.search}
        inputStyle={styles.input}
      />
      <View style={{position: 'absolute', marginTop: 50}}>
        {redditNames.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(item)}>
            <Text style={styles.item}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  search: {
    borderRadius: 8,
    width: 200,
    marginTop: 6,
    height: 40,
    // marginBottom: 5,
  },
  input: {
    fontSize: 16,
    marginTop: -7,
  },
  item: {
    padding: 8,
    fontSize: 15,
    // height: 30,
    backgroundColor: "white",
  },
});

export default SearchComponent;
