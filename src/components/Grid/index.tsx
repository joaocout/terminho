import React, { useCallback, useContext } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

import { GridContext } from '../../shared/context';
import Box from '../Box';

import type { isBoxValueCorrect } from '../../shared/types';

const CORRECT_WORD = 'palha';

const result: Array<Array<isBoxValueCorrect>> = Array(6)
  .fill(0)
  .map(() => Array(5).fill('wrong'));

const Grid = () => {
  const { grid, selectedBox, setSelectedBox } = useContext(GridContext);

  const selectedRowIndex = Math.min(Math.floor(selectedBox / 5), 4);
  const expectedWord = CORRECT_WORD.toLowerCase().split('');
  const typedWord = grid[selectedRowIndex].map((item) => item.value);

  // checking for correct boxes
  typedWord.forEach((char, i) => {
    if (char === expectedWord[i]) {
      result[selectedRowIndex][i] = 'correct';
      // removing correct chars and marking positions with a '-'
      expectedWord[i] = '-';
    }
  });

  // checking for wrong and almost
  typedWord.forEach((char, i) => {
    // if not marked by loop above
    if (expectedWord[i] !== '-') {
      if (expectedWord.includes(char)) {
        result[selectedRowIndex][i] = 'almost';
        expectedWord[expectedWord.indexOf(char)] = '-';
      } else {
        result[selectedRowIndex][i] = 'wrong';
      }
    }
  });

  const onSelectedBoxChange = useCallback(
    (selected) => {
      setSelectedBox(selected);
    },
    [setSelectedBox],
  );

  return (
    <View>
      {grid.map((row, rowIndex) => (
        <View key={`${rowIndex}`} style={styles.row}>
          {row.map((box, columnIndex) => {
            const index = rowIndex * 5 + columnIndex;
            return (
              <Box
                key={`${columnIndex}`}
                index={index}
                isSelected={selectedBox === index}
                box={box}
                onSelectedBoxChange={onSelectedBoxChange}
                isCorrect={result[rowIndex][columnIndex]}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default Grid;
