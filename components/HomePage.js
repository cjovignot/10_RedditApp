import React from "react";
import { View, Text } from "react-native";
import Card from './Card';
import Filters from './Filters';

function HomePage() {
  return (
    <View>
        <Filters />
        <Card />
        <Card />
        <Card />
        <Card />
    </View>
  );
}

export default HomePage;
