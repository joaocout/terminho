import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';

import { styles } from './styles';

import { COLORS, DEFAULT_BORDER_WIDTH } from '../../shared/constants';

import type { GridBox, isBoxValueCorrect } from '../../shared/types';

export type BoxProps = {
  index: number;
  isSelected: boolean;
  box: GridBox;
  onSelectedBoxChange: (selectedBox: number) => void;
  isCorrect: isBoxValueCorrect;
};

const Box: React.FC<BoxProps> = React.memo(
  ({ index, isSelected, box, onSelectedBoxChange, isCorrect }) => {
    const answeredColor =
      isCorrect === 'correct'
        ? 'green'
        : isCorrect === 'almost'
        ? 'goldenrod'
        : COLORS.ACCENT;

    // scale animation
    const scaleSV = useDerivedValue(() => {
      if (box.value.length && box.available) {
        return withSequence(
          withTiming(1, { duration: 0 }),
          withTiming(1.15, { duration: 70 }),
          withTiming(1, { duration: 70 }),
        );
      }
      return 1;
    }, [box.value]);

    // rotation animation
    const rotationYSV = useDerivedValue(() => {
      if (!box.available && box.value.length) {
        return withDelay(
          (index % 5) * 200,
          withTiming(-180, { duration: 600, easing: Easing.linear }),
        );
      }
      return 0;
    }, [box.available, index]);

    // background color transition
    const backgroundColorSV = useDerivedValue(() => {
      if (!box.available && box.value.length) {
        return withDelay(
          (index % 5) * 200 + 300,
          withTiming(answeredColor, { duration: 0 }),
        );
      } else if (!box.available && !box.value.length) {
        return COLORS.SECONDARY;
      }
      return undefined;
    }, [box.available, box.value]);

    // border width transition
    const borderWidthSV = useDerivedValue(() => {
      if (!box.available && box.value.length) {
        return withDelay(
          (index % 5) * 200 + 300,
          withTiming(0, { duration: 0 }),
        );
      } else if (!box.available && !box.value.length) {
        return 0;
      }
      return DEFAULT_BORDER_WIDTH;
    }, [box.available, box.value]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: scaleSV.value },
        { rotateY: `${rotationYSV.value}deg` },
      ],
      backgroundColor: backgroundColorSV.value,
      borderWidth: borderWidthSV.value,
    }));

    return (
      <Pressable
        disabled={!box.available}
        onPress={() => {
          onSelectedBoxChange(index);
        }}>
        <View style={styles.textContainer}>
          <Animated.View
            style={
              box.available
                ? [
                    styles.container,
                    animatedStyle,
                    isSelected ? { borderColor: COLORS.ACCENT } : {},
                  ]
                : [styles.container, animatedStyle]
            }
          />
          <Text
            style={[
              styles.text,
              !box.available ? { color: COLORS.PRIMARY } : {},
            ]}>
            {box.value}
          </Text>
        </View>
      </Pressable>
    );
  },
);
export default Box;
