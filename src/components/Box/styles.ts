import { StyleSheet } from 'react-native';

import { COLORS } from '../../shared/constants';

export const styles = StyleSheet.create({
  container: {
    height: 55,
    width: 55,
    borderColor: COLORS.ACCENT,
    borderWidth: 4,
    margin: 2,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unavailable: {
    borderWidth: 0,
    backgroundColor: COLORS.GREY,
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
