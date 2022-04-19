import React from 'react';
import { Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';

import { styles } from './styles';

type KeyProps = {
  onPress: (key: string) => void;
  keyPressed: string;
};

// TODO Move this to its own file
const Key: React.FC<KeyProps> = React.memo(({ onPress, keyPressed: key }) => {
  // scale animation for key
  const scaleSV = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleSV.value }],
  }));

  return (
    <Pressable
      onPressIn={() => {
        scaleSV.value = withTiming(1.3, { duration: 40 });
      }}
      onPressOut={() => {
        cancelAnimation(scaleSV);
        scaleSV.value = 1;
      }}
      onPress={() => onPress(key)}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={styles.letter}>{key}</Text>
      </Animated.View>
    </Pressable>
  );
});

export default Key;
