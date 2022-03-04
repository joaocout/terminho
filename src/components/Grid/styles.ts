import { StyleSheet } from 'react-native';

import { colors } from '../../shared/colors';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  box: {
    height: 55,
    width: 55,
    borderColor: colors.BLACK,
    borderWidth: 3,
    margin: 2,
    borderRadius: 5,
  },
});
