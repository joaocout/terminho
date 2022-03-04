import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';

import { styles } from './styles';

type GridBox = {
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
  const [selectedBox, setSelectedBox] = useState(0);
  console.log(selectedBox);
  return (
    <View>
      {grid.map((row, rowIndex) => (
        <View key={`${rowIndex}`} style={styles.row}>
          {row.map((box, boxIndex) => (
            <TouchableWithoutFeedback
              onPress={() => {
                if (grid[rowIndex][boxIndex].available) {
                  setSelectedBox(rowIndex * 5 + boxIndex);
                }
              }}>
              <View
                key={`${boxIndex}`}
                style={
                  box.available
                    ? selectedBox === rowIndex * 5 + boxIndex
                      ? [styles.box, styles.selectedBox]
                      : styles.box
                    : [styles.box, styles.unavailableBox]
                }>
                <Text style={styles.boxText}>a</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Grid;
