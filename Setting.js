import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import DATA from './parse.json';
const { height } = Dimensions.get('window');
const isIPhoneX = height === 812;

export default class Setting extends Component {
  static navigationOptions = {
    title: '解析路线',
  };
  state = {
    selectedIndex: 1,
  }
  componentDidMount() {
    AsyncStorage.getItem('PARSE_INDEX')
      .then(index => {
        const i = parseInt(index) || 1;
        selectedParse = DATA[i];
        this.setState({ selectedIndex: i });
      })
      .catch(() => {});
  }

  _renderCell = ({item, index}) => {
    const isSelected = index === this.state.selectedIndex;
    return (
      <TouchableOpacity onPress={() => {
        AsyncStorage.setItem('PARSE_INDEX', index.toString());
        this.setState({
          selectedIndex: index,
        });
        selectedParse = item;
      }}>
        <View style={styles.cellContainer}>
          <Text numberOfLines={1} style={[
            styles.cellText,
            { color: isSelected ? '#628DE1' : 'black' },
          ]}>
            {item.name}
          </Text>
          {isSelected &&
            <Image
              resizeMode="contain"
              style={styles.checkmark}
              source={require('./imgs/checkmark.png')}
            />
          }
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={DATA}
          extraData={this.state}
          keyExtractor={item => item.id.toString()}
          renderItem={this._renderCell}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isIPhoneX ? 44 : 20,
    backgroundColor: '#F5FCFF',
  },
  cellContainer: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  cellText: {
    fontSize: 15,
    width: '70%',
  },
  line: {
    position: 'absolute',
    left: 15,
    bottom: 0.5,
    right: 0,
    height: 0.5,
    backgroundColor: 'lightgray',
  },
  checkmark: {
    position: 'absolute',
    top: 10,
    right: 15,
    width: 20,
    height: 20,
  }
});
