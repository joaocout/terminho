import React, { useCallback, useContext } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

import Key from '../Key';

import { GridContext, Actions } from '../../shared/context';

const kb = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'del'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'],
];

const Keyboard = React.memo(() => {
  const { dispatch } = useContext(GridContext);

  const onPress = useCallback(
    (key: string) => {
      if (key.length === 1) {
        // update the value of the selected box and go to the next one
        dispatch({ type: Actions.SET_BOX_VALUE, payload: key });
        dispatch({ type: Actions.NEXT_BOX });
      } else if (key === 'del') {
        // clear the value of the selected box and go back to prev one
        dispatch({ type: Actions.SET_BOX_VALUE, payload: '' });
        dispatch({ type: Actions.PREV_BOX });
      } else if (key === 'enter') {
        // when enter is pressed, go to the next row
        dispatch({ type: Actions.NEXT_ROW });
      }
    },
    [dispatch],
  );

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
});

export default Keyboard;
