import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { colors } from '../../shared/colors';

const kb = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'del'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'],
];

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
    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
      {kb.map(row => (
        <View key={row.join('')} style={{ flexDirection: 'row' }}>
          {row.map(letter => (
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 10,
                backgroundColor: colors.ACCENT,
                margin: 2,
                borderRadius: 5,
              }}
              key={letter}>
              <Text
                style={{
                  textTransform: 'uppercase',
                  color: colors.WHITE,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                {letter}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  </View>
);

export default RNTermooo;
