import React, { useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

const initialState: Array<Array<string>> = Array(5).fill(Array(5).fill(''));

const Grid: React.FC = () => {
  const [grid, setGrid] = useState(initialState);

  return (
    <View>
      {grid.map((row, rowIndex) => (
        <View key={`${rowIndex}`} style={styles.row}>
          {row.map((letter, letterIndex) => (
            <View key={`${letterIndex}`} style={styles.box} />
          ))}
        </View>
      ))}
    </View>
  );
};

export default Grid;
