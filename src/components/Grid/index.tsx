import React, { useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

import Box from '../Box';

export type GridBox = {
  available: boolean;
  value: string;
};

const initialState: Array<Array<GridBox>> = Array(5)
  .fill(Array(5).fill({ available: false, value: '' }))
  .map((item, index) => {
    if (index === 0) {
      // initializing first row with active boxes
      const arr: Array<GridBox> = Array(5).fill({ available: true, value: '' });
      return arr;
    }
    return item;
  });

const Grid: React.FC = () => {
  const [grid, setGrid] = useState(initialState);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(0);

  console.log(selectedBoxIndex);

  return (
    <View>
      {grid.map((row, rowIndex) => (
        <View key={`${rowIndex}`} style={styles.row}>
          {row.map((box, boxIndex) => (
            <Box
              index={rowIndex * 5 + boxIndex}
              selectedIndex={selectedBoxIndex}
              box={box}
              onSelectedBoxChange={selected => setSelectedBoxIndex(selected)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default Grid;
