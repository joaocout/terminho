import { StyleSheet } from 'react-native';

import { COLORS } from '../../shared/constants';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.GRAY,
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 4,
    marginHorizontal: 2,
  },

  text: {
    fontSize: 20,
    color: 'black',
  },
});
