import { StyleSheet } from 'react-native';

import { COLORS } from '../../shared/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: COLORS.WHITE,
    paddingBottom: 70,
  },
  title: {
    paddingTop: 50,
    fontWeight: '900',
    fontSize: 20,
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  resetText: {
    color: COLORS.BLACK,
    textAlign: 'right',
  },
  resetContainer: {
    alignSelf: 'stretch',
    backgroundColor: 'yellow',
    alignItems: 'flex-end',
  },
});
