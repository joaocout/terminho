import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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

const SELECTED_BOTTOM_BORDER_WIDTH = 9;
const BOTTOM_BORDER_WIDTH = 3;

const Grid: React.FC = () => {
  const [grid, setGrid] = useState(initialState);
  const [selectedBoxIndex, setSelectedBox] = useState(0);

  const borderBottomWidth = useSharedValue(BOTTOM_BORDER_WIDTH);

  const borderBottomAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderBottomWidth: borderBottomWidth.value,
    };
  });

  return (
    <View>
      {grid.map((row, rowIndex) => (
        <View key={`${rowIndex}`} style={styles.row}>
          {row.map((box, boxIndex) => (
            <TouchableWithoutFeedback
              key={`${boxIndex}`}
              onPress={() => {
                if (grid[rowIndex][boxIndex].available) {
                  if (rowIndex * 5 + boxIndex! !== selectedBoxIndex) {
                    borderBottomWidth.value = 3;
                    setSelectedBox(rowIndex * 5 + boxIndex);
                    borderBottomWidth.value = withTiming(
                      SELECTED_BOTTOM_BORDER_WIDTH,
                      { duration: 200 },
                    );
                  }
                }
              }}>
              <Animated.View
                style={
                  box.available
                    ? selectedBoxIndex === rowIndex * 5 + boxIndex
                      ? [styles.box, borderBottomAnimatedStyle]
                      : styles.box
                    : [styles.box, styles.unavailableBox]
                }>
                <Text style={styles.boxText}>{box.value}</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Grid;
