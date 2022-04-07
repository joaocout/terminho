import React from 'react';
import { TouchableWithoutFeedback, Text, View } from 'react-native';
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';

import { styles } from './styles';

import { COLORS } from '../../shared/constants';

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
          withTiming(-180, { duration: 500 }),
        );
      }
      return 0;
    }, [box.available, index]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: scaleSV.value },
        { rotateY: `${rotationYSV.value}deg` },
      ],
    }));

    return (
      <TouchableWithoutFeedback
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
                : [
                    styles.container,
                    animatedStyle,
                    styles.unavailable,
                    box.value.length
                      ? { backgroundColor: answeredColor, borderWidth: 0 }
                      : {},
                  ]
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
      </TouchableWithoutFeedback>
    );
  },
);
export default Box;
