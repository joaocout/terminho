import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styles";

import Keyboard from "../../components/Keyboard";
import Grid from "../../components/Grid";

function RNTermooo() {
  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <Text style={styles.title}>terminho</Text>
        <Grid />
      </View>
      <Keyboard />
    </View>
  );
}

export default RNTermooo;
