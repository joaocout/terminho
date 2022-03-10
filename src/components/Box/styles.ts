import { StyleSheet } from 'react-native';

import { colors } from '../../shared/colors';
import { BOTTOM_BORDER_WIDTH_DEFAULT } from '../../shared/constants';

export const styles = StyleSheet.create({
  container: {
    height: 55,
    width: 55,
    borderColor: colors.ACCENT,
    borderWidth: BOTTOM_BORDER_WIDTH_DEFAULT,
    margin: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unavailable: {
    borderWidth: 0,
    backgroundColor: colors.GREY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    position: 'absolute',
    fontWeight: '900',
    color: colors.BLACK,
    textTransform: 'uppercase',
    fontSize: 20,
  },
});
