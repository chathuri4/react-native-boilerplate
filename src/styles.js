'use-strict'
import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  page_header: {
    fontSize: 16
  },

  error: {
    color: 'red'
  },

  signin_button: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    width: 250
  },

  separator: {
    flex: 1,
    backgroundColor: '#d6d7da',
    height: 1,
  }
});
