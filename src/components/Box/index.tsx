import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';

import { styles } from './styles';

import { COLORS } from '../../shared/constants';
import type { IBox } from '../../shared/types';

interface IBoxProps {
  box: IBox;
  isSelected: boolean;
  boxIndex: number;
  onBoxPress: (boxIndex: number) => void;
}

function Box({ box, isSelected, boxIndex, onBoxPress }: IBoxProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const BOX_WIDTH = SCREEN_WIDTH / 7;

  const BOX_COLOR =
    box.correctness === 'correct'
      ? COLORS.GREEN
      : box.correctness === 'almost'
      ? COLORS.YELLOW
      : COLORS.GRAY;

  const handleBoxPress = () => {
    onBoxPress(boxIndex);
  };

  return (
    <TouchableWithoutFeedback
      disabled={!box.available}
      // eslint-disable-next-line react/no-array-index-key
      onPress={handleBoxPress}
    >
      <View
        style={[
          styles.container,
          {
            width: BOX_WIDTH,
          },
          isSelected && { borderWidth: 4 },
          !box.available &&
            box.value !== '' && {
              borderWidth: 0,
              backgroundColor: BOX_COLOR,
            },
        ]}
      >
        <Text style={styles.text}>{box.value}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default React.memo(Box);
