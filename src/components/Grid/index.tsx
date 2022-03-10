import React, { useContext } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

import { GridContext } from '../../shared/context';
import Box from '../Box';

export type GridBox = {
  available: boolean;
  value: string;
};

const Grid: React.FC = () => {
  const { grid, selectedBox, setSelectedBox } = useContext(GridContext);

  return (
    <View>
      {grid.map((row, rowIndex) => (
        <View key={`${rowIndex}`} style={styles.row}>
          {row.map((box, columnIndex) => (
            <Box
              key={`${columnIndex}`}
              index={rowIndex * 5 + columnIndex}
              selectedIndex={selectedBox}
              box={box}
              onSelectedBoxChange={selected => setSelectedBox(selected)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default Grid;
