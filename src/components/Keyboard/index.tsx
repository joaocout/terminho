import React, { useCallback } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useAtomValue, useSetAtom } from 'jotai';

import { styles } from './styles';

import Key from '../Key';

import {
  setBoxValueAtom,
  nextRowAtom,
  deleteBoxValueAtom,
  almostLettersAtom,
  correctLettersAtom,
  wrongLettersAtom,
} from '../../shared/atoms';
import type {} from '../../shared/types';
import { COLORS } from '../../shared/constants';

const KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del'],
];

export default function Keyboard() {
  const setBoxValue = useSetAtom(setBoxValueAtom);
  const nextRow = useSetAtom(nextRowAtom);
  const deleteBoxValue = useSetAtom(deleteBoxValueAtom);
  const almostLetters = useAtomValue(almostLettersAtom);
  const correctLetters = useAtomValue(correctLettersAtom);
  const wrongLetters = useAtomValue(wrongLettersAtom);

  const handleKeyboardPress = useCallback((key: string) => {
    if (key === 'enter') {
      nextRow();
    } else if (key === 'del') {
      deleteBoxValue();
    } else {
      setBoxValue(key);
    }
  }, []);

  return (
    <View style={styles.container}>
      {KEYS.map((row) => (
        <View key={row.join('')} style={styles.row}>
          {row.map((key) => (
            <Key
              key={key}
              value={key}
              onKeyPress={handleKeyboardPress}
              color={
                correctLetters.has(key)
                  ? COLORS.GREEN
                  : almostLetters.has(key)
                  ? COLORS.YELLOW
                  : wrongLetters.has(key)
                  ? COLORS.GRAY
                  : undefined
              }
            />
          ))}
        </View>
      ))}
    </View>
  );
}
