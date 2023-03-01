import React from 'react';
import { View } from 'react-native';
import { useAtomValue } from 'jotai';

import { styles } from './styles';

import Box from '../Box';

import { gridAtom, columnIAtom, rowIAtom } from '../../shared/atoms';

export default function Grid() {
  const grid = useAtomValue(gridAtom);
  const columnI = useAtomValue(columnIAtom);
  const rowI = useAtomValue(rowIAtom);

  return (
    <View style={styles.container}>
      {grid.map((row, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={`${rowIndex}`} style={styles.row}>
          {row.map((box, columnIndex) => (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={`${columnIndex}`}
              box={box}
              boxIndex={columnIndex}
              isSelected={rowI === rowIndex && columnI === columnIndex}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
