import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import Keyboard from '../../components/Keyboard';
import Grid from '../../components/Grid';
import { GridContext } from '../../shared/context';

const RNTermooo: React.FC = () => {
  const { reset } = useContext(GridContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.resetContainer} onPress={() => reset()}>
        <Text style={styles.resetText}>reset</Text>
      </TouchableOpacity>
      <Text style={styles.title}>terminho</Text>
      <Grid />
      <Keyboard />
    </View>
  );
};

export default RNTermooo;
