import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import { useSetAtom } from 'jotai';

import { styles } from './styles';

import { columnIAtom } from '../../shared/atoms';
import type { IBox } from '../../shared/types';

interface IBoxProps {
  box: IBox;
  isSelected: boolean;
  boxIndex: number;
}

function Box({ box, isSelected, boxIndex }: IBoxProps) {
  const setColumnI = useSetAtom(columnIAtom);

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const BOX_WIDTH = SCREEN_WIDTH / 7;

  const BOX_COLOR =
    box.correctness === 'correct'
      ? 'limegreen'
      : box.correctness === 'almost'
      ? 'yellow'
      : 'lightgray';

  const handleBoxPress = () => {
    setColumnI(boxIndex);
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
          isSelected && { borderWidth: 5 },
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

function shouldBoxUpdate(prevBox: IBoxProps, nextBox: IBoxProps) {
  if (prevBox.isSelected !== nextBox.isSelected) return false;
  if (JSON.stringify(prevBox.box) !== JSON.stringify(nextBox.box)) return false;

  return true;
}

export default React.memo(Box, shouldBoxUpdate);
