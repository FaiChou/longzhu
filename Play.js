import React, { Component } from 'react';
import { WebView, StyleSheet } from 'react-native';

export default class Play extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTintColor: 'black',
    title: navigation.getParam('title'),
  });
  render() {
    const url = this.props.navigation.getParam('url');
    return (
      <WebView
        source={{uri: url}}
        style={styles.web}
      />
    );
  }
}

const styles = StyleSheet.create({
  web: {
    flex: 1,
  },
});
