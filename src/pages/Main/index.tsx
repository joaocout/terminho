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
      <TouchableOpacity
        style={{ alignSelf: 'stretch' }}
        onPress={() => reset()}>
        <Text style={{ textAlign: 'right' }}>RESET</Text>
      </TouchableOpacity>
      <Text style={styles.title}>TERMINHO</Text>
      <Grid />
      <Keyboard />
    </View>
  );
};

export default RNTermooo;
