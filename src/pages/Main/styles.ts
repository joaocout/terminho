import { StyleSheet } from 'react-native';

import { COLORS } from '../../shared/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: COLORS.WHITE,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '900',
    fontSize: 20,
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  resetText: {
    textAlign: 'right',
    color: 'lightgrey',
  },
  resetContainer: {
    alignSelf: 'stretch',
  },
});
