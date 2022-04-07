import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { styles } from './styles';

import { GridContext } from '../../shared/context';

const kb = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'del'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'],
];

const Keyboard: React.FC = () => {
  const { updateBoxValue, nextRow, nextBox, prevBox } = useContext(GridContext);

  const onPress = (key: string) => {
    if (key.length === 1) {
      // update the value of the selected box and go to the next one
      updateBoxValue(key);
      nextBox();
    } else if (key === 'del') {
      // clear the value of the selected box and go back to prev one
      updateBoxValue('');
      prevBox();
    } else if (key === 'enter') {
      // when enter is pressed, go to the next row
      nextRow();
    }
  };

  return (
    <View style={styles.container}>
      {kb.map((row) => (
        <View key={row.join('')} style={styles.row}>
          {row.map((key) => (
            <Key key={key} onPress={onPress} keyPressed={key} />
          ))}
        </View>
      ))}
    </View>
  );
};

type KeyProps = {
  onPress: (key: string) => void;
  keyPressed: string;
};

// TODO Move this to its own files
const Key: React.FC<KeyProps> = ({ onPress, keyPressed: key }) => {
  // scale animation for key
  const scaleSV = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleSV.value }],
  }));

  return (
    <Pressable
      onPressIn={() => {
        scaleSV.value = withTiming(1.3, { duration: 35 });
      }}
      onPressOut={() => {
        cancelAnimation(scaleSV);
        scaleSV.value = 1;
      }}
      onPress={() => onPress(key)}>
      <Animated.View style={[styles.letterContainer, animatedStyle]}>
        <Text style={styles.letterText}>{key}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default Keyboard;
