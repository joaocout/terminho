import React, { useContext } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import { styles } from './styles';

import { GridContext } from '../../shared/context';

const kb = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'del'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'],
];

const Keyboard: React.FC = () => {
  const { selectedBox, setSelectedBox, updateBoxValue } =
    useContext(GridContext);

  return (
    <View style={styles.container}>
      {kb.map(row => (
        <View key={row.join('')} style={styles.row}>
          {row.map(key => (
            <TouchableHighlight
              onPress={() => {
                //if the length is 1, it's a letter
                if (key.length === 1) {
                  updateBoxValue(selectedBox, key);
                  if (selectedBox % 5 < 4) {
                    setSelectedBox(prev => prev + 1);
                  }
                } else if (key === 'del') {
                  updateBoxValue(selectedBox, '');
                  if (selectedBox % 5 > 0) {
                    setSelectedBox(prev => prev - 1);
                  }
                }
              }}
              style={styles.letterContainer}
              key={key}>
              <Text style={styles.letterText}>{key}</Text>
            </TouchableHighlight>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Keyboard;
