import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 0,
    ...Platform.select({
      android: {
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
      ios: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowColor: 'rgba(123, 128, 140, 0.3)',
      },
    }),
  },
});
