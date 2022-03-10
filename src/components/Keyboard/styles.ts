import { StyleSheet } from 'react-native';

import { COLORS } from '../../shared/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  letterContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: COLORS.ACCENT,
    margin: 2,
    borderRadius: 5,
  },
  letterText: {
    textTransform: 'uppercase',
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: '900',
  },
});
