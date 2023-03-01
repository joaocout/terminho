import { StyleSheet } from 'react-native';

import { COLORS } from '../../shared/constants';

export const styles = StyleSheet.create({
  container: {},

  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },

  keyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.GRAY,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 2,
    padding: 6,
  },

  keyText: {
    fontSize: 24,
    color: 'black',
  },
});
