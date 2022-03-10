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

import type { BoxProps } from '../../shared/types';

const Box: React.FC<BoxProps> = ({
  index,
  selectedIndex,
  box,
  onSelectedBoxChange,
}) => {
  // bottom border animation
  const borderBottomSV = useSharedValue(
    index === 0 ? BOTTOM_BORDER_WIDTH_SELECTED : BOTTOM_BORDER_WIDTH_DEFAULT,
  );
  const borderBottomAStyle = useAnimatedStyle(() => ({
    borderBottomWidth: borderBottomSV.value,
  }));

  // scale animation
  const scaleSV = useSharedValue(1);
  const scaleAStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleSV.value }],
  }));

  //handling bottom border animation
  useEffect(() => {
    if (selectedIndex !== index) {
      borderBottomSV.value = BOTTOM_BORDER_WIDTH_DEFAULT;
    } else {
      borderBottomSV.value = withTiming(BOTTOM_BORDER_WIDTH_SELECTED, {
        duration: 100,
      });
    }
  }, [borderBottomSV, selectedIndex, index]);

  //animating last box from row
  useEffect(() => {
    if (box.value !== '' && index % 5 === 4) {
      borderBottomSV.value = BOTTOM_BORDER_WIDTH_DEFAULT;
    }
  }, [borderBottomSV, box, index]);

  // animating when typing
  useEffect(() => {
    if (box.value !== '') {
      scaleSV.value = withSequence(
        withSpring(1.1, { damping: 20, stiffness: 400, restSpeedThreshold: 4 }),
        withSpring(1, { damping: 20, stiffness: 400, restSpeedThreshold: 4 }),
      );
    }
  }, [box, scaleSV]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (selectedIndex !== index && box.available) {
          onSelectedBoxChange(index);
        }
      }}>
      <Animated.View
        style={
          box.available
            ? [styles.container, borderBottomAStyle, scaleAStyle]
            : box.value !== ''
            ? [styles.container, styles.answered]
            : [styles.container, styles.unavailable]
        }>
        <Text
          style={box.available ? styles.text : [styles.text, styles.whiteText]}>
          {box.value}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Box;
