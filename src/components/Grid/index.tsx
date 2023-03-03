import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useAtomValue, useAtom } from 'jotai';

import { styles } from './styles';

import Box from '../Box';

import { gridAtom, columnIAtom, rowIAtom } from '../../shared/atoms';

export default function Grid() {
  const [columnI, setColumnI] = useAtom(columnIAtom);
  const grid = useAtomValue(gridAtom);
  const rowI = useAtomValue(rowIAtom);

  const handleBoxPress = useCallback((boxIndex: number) => {
    setColumnI(boxIndex);
  }, []);

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
              onBoxPress={handleBoxPress}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
