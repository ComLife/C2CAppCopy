import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  divisorLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bcbcbc',
  },
  titleText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    width: 'auto',
  },
  extraText: {
    fontSize: 12,
    color: '#bcbcbc',
    fontWeight: '400',
  },
  viewWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    width: 6,
    height: 11,
  },
});
