import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from 'react-native';

import { styles } from './styles';

interface IKeyProps {
  value: string;
  onKeyPress: (value: string) => void;
  color: string | undefined;
}

function Key({ value, onKeyPress, color }: IKeyProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const KEY_WIDTH = SCREEN_WIDTH / 12;

  const handleKeyPress = () => onKeyPress(value);

  return (
    <TouchableOpacity onPress={handleKeyPress}>
      <View
        style={[
          styles.container,
          { width: KEY_WIDTH, height: KEY_WIDTH * 1.5 },
          ['del', 'enter'].includes(value) && {
            width: KEY_WIDTH * 1.5,
            marginHorizontal: 0,
            marginLeft: value === 'del' ? 8 : undefined,
            marginRight: value === 'enter' ? 8 : undefined,
          },
          color !== undefined && { backgroundColor: color, borderWidth: 0 },
        ]}
      >
        <Text
          style={[
            styles.text,
            ['del', 'enter'].includes(value) && { fontSize: 14 },
          ]}
        >
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(Key);
