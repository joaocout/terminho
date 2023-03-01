import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from 'react-native';
import { useSetAtom } from 'jotai';

import { styles } from './styles';

import {
  setBoxValueAtom,
  nextRowAtom,
  deleteBoxValueAtom,
} from '../../shared/atoms';

const KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'del'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'],
];

export default function Keyboard() {
  const setBoxValue = useSetAtom(setBoxValueAtom);
  const nextRow = useSetAtom(nextRowAtom);
  const deleteBoxValue = useSetAtom(deleteBoxValueAtom);

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const KEY_WIDTH = SCREEN_WIDTH / 14;

  const handleKeyboardPress = (keyPressed: string) => {
    if (keyPressed === 'enter') {
      nextRow();
    } else if (keyPressed === 'del') {
      deleteBoxValue();
    } else {
      setBoxValue(keyPressed);
    }
  };

  return (
    <View style={styles.container}>
      {KEYS.map((keyRow) => (
        <View key={keyRow.join('')} style={styles.row}>
          {keyRow.map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => handleKeyboardPress(key)}
            >
              <View style={[styles.keyContainer, { minWidth: KEY_WIDTH }]}>
                <Text style={styles.keyText}>{key}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
