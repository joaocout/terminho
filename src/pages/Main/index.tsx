import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

import Grid from '../../components/Grid';
import Keyboard from '../../components/Keyboard';

export default function Main() {
  return (
    <View style={styles.container}>
      <Grid />
      <Keyboard />
    </View>
  );
}
