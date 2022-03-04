import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { colors } from '../../shared/colors';

import Keyboard from '../../components/Keyboard';

const a = new Array(5).fill(0);

const RNTermooo: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>TERMINHO</Text>
    <View style={{ flexDirection: 'row', marginTop: 20 }}>
      {a.map(item => (
        <View
          style={{
            height: 50,
            width: 50,
            borderColor: colors.BLACK,
            borderWidth: 3,
            margin: 2,
            borderRadius: 5,
          }}></View>
      ))}
    </View>
    <Keyboard />
  </View>
);

export default RNTermooo;
