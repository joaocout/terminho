import { StyleSheet } from 'react-native';
import { colors } from '../../shared/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  letterContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: colors.ACCENT,
    margin: 2,
    borderRadius: 5,
  },
  letterText: {
    textTransform: 'uppercase',
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: '900',
  },
});
