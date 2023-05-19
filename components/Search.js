import * as React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
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
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.search}
      />
      <View>
        {redditNames.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(item)}>
            <Text style={styles.item}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    width: 200,
    borderRadius: 0,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: "white",
  },
  //   resultContainer: {
  //     marginTop: 50, // adjust this as needed
  //   },
});

export default SearchComponent;
