import { StyleSheet } from 'react-native';

import { COLORS, DEFAULT_BORDER_WIDTH } from '../../shared/constants';

export const styles = StyleSheet.create({
  container: {
    height: 55,
    width: 55,
    borderColor: COLORS.ACCENT,
    borderWidth: DEFAULT_BORDER_WIDTH,
    margin: 2,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    position: 'absolute',
    fontWeight: '900',
    color: COLORS.BLACK,
    textTransform: 'uppercase',
    fontSize: 32,
  },
});
