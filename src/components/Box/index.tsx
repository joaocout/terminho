import React, { useEffect } from 'react';
import { TouchableWithoutFeedback, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
} from 'react-native-reanimated';

import { styles } from './styles';

import {
  BOTTOM_BORDER_WIDTH_DEFAULT,
  BOTTOM_BORDER_WIDTH_SELECTED,
} from '../../shared/constants';

import type { GridBox } from '../Grid';

type BoxProps = {
  index: number;
  selectedIndex: number;
  box: GridBox;
  onSelectedBoxChange: (selectedBox: number) => void;
};

const Box: React.FC<BoxProps> = ({
  index,
  selectedIndex,
  box,
  onSelectedBoxChange,
}) => {
  // border bottom width animation
  const borderBottomSV = useSharedValue(
    index === 0 ? BOTTOM_BORDER_WIDTH_SELECTED : BOTTOM_BORDER_WIDTH_DEFAULT,
  );
  const borderBottomAStyle = useAnimatedStyle(() => ({
    borderBottomWidth: borderBottomSV.value,
  }));

  // box scale animation
  const scaleSV = useSharedValue(1);
  const scaleAStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleSV.value }],
  }));

  // handling bottom border animations
  useEffect(() => {
    // if this box is not selected, its border value should go back to default
    if (selectedIndex !== index) {
      borderBottomSV.value = BOTTOM_BORDER_WIDTH_DEFAULT;

      // if this box is selected, we animate its border value
    } else {
      borderBottomSV.value = withTiming(BOTTOM_BORDER_WIDTH_SELECTED, {
        duration: 100,
      });
    }
  }, [borderBottomSV, selectedIndex, index]);

  // bottom border animation of last box in a row
  useEffect(() => {
    if (box.value !== '' && index % 5 === 4) {
      borderBottomSV.value = BOTTOM_BORDER_WIDTH_DEFAULT;
    }
  }, [borderBottomSV, box, index]);

  useEffect(() => {
    if (box.value !== '') {
      scaleSV.value = withSequence(
        withSpring(1.1, { damping: 20, stiffness: 400, restSpeedThreshold: 4 }),
        withSpring(1, { restSpeedThreshold: 4 }),
      );
    }
  }, [box, scaleSV]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (selectedIndex !== index) {
          onSelectedBoxChange(index);
        }
      }}>
      <Animated.View
        style={
          box.available
            ? [styles.container, borderBottomAStyle, scaleAStyle]
            : [styles.container, styles.unavailable]
        }>
        <Text style={styles.text}>{box.value}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Box;
