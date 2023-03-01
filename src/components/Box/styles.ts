import { StyleSheet } from 'react-native';

import { COLORS } from '../../shared/constants';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.GRAY,
    borderWidth: 3,
    borderRadius: 4,
    margin: 3,
    aspectRatio: 1,
    backgroundColor: 'white',
  },

  text: {
    fontSize: 24,
    fontWeight: '500',
  },
});
