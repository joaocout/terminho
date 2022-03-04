import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

import Keyboard from '../../components/Keyboard';
import Grid from '../../components/Grid';

const RNTermooo: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>TERMINHO</Text>
    <View style={styles.gridContainer}>
      <Grid />
    </View>
    <Keyboard />
  </View>
);

export default RNTermooo;
