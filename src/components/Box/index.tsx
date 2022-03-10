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

import type { BoxProps } from '../../shared/types';

const Box: React.FC<BoxProps> = ({
  index,
  selectedIndex,
  box,
  onSelectedBoxChange,
}) => {
  // scale animation
  const scaleSV = useDerivedValue(() => {
    if (box.value !== '') {
      return withSequence(
        withTiming(1.1, { duration: 50 }),
        withTiming(1, { duration: 50 }),
      );
    }
    return 1;
  }, [box]);
  const scaleAStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleSV.value }],
  }));

  // rotation Y animation
  const rotationYSV = useDerivedValue(() => {
    if (!box.available && box.value !== '') {
      return withDelay((index % 5) * 200, withTiming(-180, { duration: 600 }));
    }
    return 0;
  }, [box, index]);
  const rotationAStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotationYSV.value}deg` }],
  }));

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (selectedIndex !== index && box.available) {
          onSelectedBoxChange(index);
        }
      }}>
      <View style={styles.textContainer}>
        <Animated.View
          style={
            box.available
              ? [
                  styles.container,
                  scaleAStyle,
                  index === selectedIndex
                    ? { borderColor: COLORS.DARKER_ACCENT }
                    : {},
                ]
              : box.value !== ''
              ? [styles.container, styles.answered, rotationAStyle]
              : [styles.container, styles.unavailable]
          }
        />
        <Text
          style={box.available ? styles.text : [styles.text, styles.whiteText]}>
          {box.value}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Box;
