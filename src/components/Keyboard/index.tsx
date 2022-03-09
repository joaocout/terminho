import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { styles } from './styles';

const kb = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'del'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'],
];

const Keyboard: React.FC = () => (
  <View style={styles.container}>
    {kb.map(row => (
      <View key={row.join('')} style={styles.row}>
        {row.map(letter => (
          <TouchableHighlight
            onPress={() => null}
            style={styles.letterContainer}
            key={letter}>
            <Text style={styles.letterText}>{letter}</Text>
          </TouchableHighlight>
        ))}
      </View>
    ))}
  </View>
);

export default Keyboard;
