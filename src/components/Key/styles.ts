import { StyleSheet, Dimensions } from 'react-native';

import { COLORS } from '../../shared/constants';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: COLORS.SECONDARY,
    margin: 2,
    borderRadius: 5,
    minWidth: width / 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  letter: {
    textTransform: 'uppercase',
    color: COLORS.BLACK,
    fontSize: 18,
    fontWeight: '900',
  },
});
