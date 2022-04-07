import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';

import { styles } from './styles';

import { COLORS, BOTTOM_BORDER_WIDTH_DEFAULT } from '../../shared/constants';

import type { GridBox } from '../../shared/types';

const CORRECT_WORD = 'termo';

export type BoxProps = {
  index: number;
  isSelected: boolean;
  box: GridBox;
  onSelectedBoxChange: (selectedBox: number) => void;
};

const Box: React.FC<BoxProps> = React.memo(
  ({ index, isSelected, box, onSelectedBoxChange }) => {
    const answeredColor =
      box.value === CORRECT_WORD[index % 5].toLowerCase()
        ? 'green'
        : CORRECT_WORD.toLocaleLowerCase().includes(box.value)
        ? 'goldenrod'
        : COLORS.DARKER_ACCENT;

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
          withTiming(-180, { duration: 600 }),
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
        return COLORS.GREY;
      }
      return COLORS.WHITE;
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
      return BOTTOM_BORDER_WIDTH_DEFAULT;
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
        onPress={() => {
          if (!isSelected && box.available) {
            onSelectedBoxChange(index);
          }
        }}>
        <View style={styles.textContainer}>
          <Animated.View
            style={
              box.available
                ? [
                    styles.container,
                    animatedStyle,
                    isSelected ? { borderColor: COLORS.DARKER_ACCENT } : {},
                  ]
                : [styles.container, animatedStyle]
            }
          />
          <Text
            style={[
              styles.text,
              !box.available ? { color: COLORS.WHITE } : {},
            ]}>
            {box.value}
          </Text>
        </View>
      </Pressable>
    );
  },
);
export default Box;
