import { StyleSheet } from 'react-native';
import { colors } from '../../shared/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: colors.WHITE,
    paddingBottom: 70,
  },
  title: {
    paddingTop: 50,
    fontWeight: '900',
    fontSize: 20,
    color: colors.BLACK,
    marginBottom: 10,
  },
  resetText: {
    color: colors.BLACK,
    textAlign: 'right',
  },
  resetContainer: {
    alignSelf: 'stretch',
    backgroundColor: 'yellow',
    alignItems: 'flex-end',
  },
});
