import { StyleSheet } from 'react-native';
import { colors } from '../../shared/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: colors.WHITE,
    marginVertical: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.BLACK,
    marginBottom: 10,
  },
});
