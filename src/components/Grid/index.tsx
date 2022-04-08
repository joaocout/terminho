import React, { useCallback, useContext } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

import { GridContext } from '../../shared/context';
import Box from '../Box';

import type { isBoxValueCorrect } from '../../shared/types';

const CORRECT_WORD = 'termo';

const result: Array<Array<isBoxValueCorrect>> = Array(6)
  .fill(0)
  .map(() => Array(5).fill('wrong'));

const Grid: React.FC = () => {
  const { grid, selectedBox, setSelectedBox } = useContext(GridContext);

  const selectedRow = Math.floor(selectedBox / 5);
  const expectedWord = CORRECT_WORD.toLowerCase().split('');
  const typedWord = grid[selectedRow].map((item) => item.value);

  // checking for correct boxes
  typedWord.forEach((char, i) => {
    if (char === expectedWord[i]) {
      result[selectedRow][i] = 'correct';
      // removing correct chars and marking positions with a '-'
      expectedWord[i] = '-';
    }
  });

  // checking for wrong and almost
  typedWord.forEach((char, i) => {
    // if not marked by loop above
    if (expectedWord[i] !== '-') {
      if (expectedWord.includes(char)) {
        result[selectedRow][i] = 'almost';
      } else {
        result[selectedRow][i] = 'wrong';
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
