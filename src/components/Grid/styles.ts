import { StyleSheet } from 'react-native';

import { colors } from '../../shared/colors';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  box: {
    height: 55,
    width: 55,
    borderColor: colors.ACCENT,
    borderWidth: 3,
    margin: 2,
    borderRadius: 5,
  },
  unavailableBox: {
    height: 55,
    width: 55,
    margin: 2,
    borderRadius: 5,
    backgroundColor: colors.GREY,
  },
});
