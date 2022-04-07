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
  const { updateBoxValue, nextRow, nextBox, prevBox } = useContext(GridContext);

  return (
    <View style={styles.container}>
      {kb.map(row => (
        <View key={row.join('')} style={styles.row}>
          {row.map(key => (
            <TouchableHighlight
              onPress={() => {
                // if the length is 1, it's a letter
                if (key.length === 1) {
                  // update the value of the selected box and go to the next one
                  updateBoxValue(key);
                  nextBox();
                } else if (key === 'del') {
                  // clear the value of the selected box and go back to prev one
                  updateBoxValue('');
                  prevBox();
                } else if (key === 'enter') {
                  // when enter is pressed, go to the next row
                  nextRow();
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
