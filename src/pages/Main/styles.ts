import { StyleSheet } from 'react-native';
import { colors } from '../../shared/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: colors.WHITE,
    paddingVertical: 70,
  },
  title: {
    fontWeight: '900',
    fontSize: 20,
    color: colors.BLACK,
    marginBottom: 20,
  },
});
