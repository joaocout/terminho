import { StyleSheet } from 'react-native';
import { colors } from '../../shared/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: colors.WHITE,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.BLACK,
  },

  text: {
    fontSize: 10,
    color: colors.BLACK,
  },
});
