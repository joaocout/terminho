import React, { useEffect } from 'react';
import { TouchableWithoutFeedback, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { styles } from './styles';

import type { GridBox } from '../Grid';

type BoxProps = {
  index: number;
  selectedIndex: number;
  box: GridBox;
  onSelectedBoxChange: (selectedBox: number) => void;
};

const BOTTOM_BORDER_WIDTH_SELECTED = 9;
const BOTTOM_BORDER_WIDTH_DEFAULT = 3;

const Box: React.FC<BoxProps> = ({
  index,
  selectedIndex,
  box,
  onSelectedBoxChange,
}) => {
  // border bottom width animation
  const borderBottomSV = useSharedValue(BOTTOM_BORDER_WIDTH_DEFAULT);
  const borderBottomAStyle = useAnimatedStyle(() => ({
    borderBottomWidth: borderBottomSV.value,
  }));

  useEffect(() => {
    if (selectedIndex !== index) {
      borderBottomSV.value = BOTTOM_BORDER_WIDTH_DEFAULT;
    }
  }, [borderBottomSV, selectedIndex, index]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (selectedIndex !== index) {
          borderBottomSV.value = withTiming(BOTTOM_BORDER_WIDTH_SELECTED, {
            duration: 200,
          });
          onSelectedBoxChange(index);
        }
      }}>
      <Animated.View
        style={
          box.available
            ? [styles.container, borderBottomAStyle]
            : [styles.container, styles.unavailable]
        }>
        <Text style={styles.text}>{box.value}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Box;
