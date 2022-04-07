import React, { useCallback, useContext } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

import { GridContext } from '../../shared/context';
import Box from '../Box';

const Grid: React.FC = () => {
  const { grid, selectedBox, setSelectedBox } = useContext(GridContext);

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
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default Grid;
