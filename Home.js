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
import DATA from './lz.json';
const { height } = Dimensions.get('window');
const isIPhoneX = height === 812;

const ITEM_HEIGHT = 40;

export default class Home extends Component {
  static navigationOptions = {
    title: '龙珠超',
  };
  state = {
    lastPlayIndex: -1,
  };
  async componentDidMount() {
    try {
      const index = await this._retrieveData();
      this.setState({
        lastPlayIndex: parseInt(index),
      });
      this.refs.list.scrollToIndex({
        viewOffSet: 0,
        index: parseInt(index),
      });
    } catch(error) {
      // console.log('componentDidMount error:', error);
    }
  }
  _renderCell = ({item}) => {
    const isLastPlay = item.id === this.state.lastPlayIndex;
    return (
      <TouchableOpacity onPress={() => {
        this.setState({
          lastPlayIndex: item.id,
        });
        this._storeData(item.id);
        this.props.navigation.navigate(
          'Play',
          {
            title: item.title,
            url: selectedParse.url+item.url,
          }
        );
      }}>
        <View style={styles.cellContainer}>
          <Text numberOfLines={1} style={[
            styles.cellText,
            { color: isLastPlay ? '#628DE1' : 'black' },
          ]}>
            {`${item.num}. ${item.title}`}
          </Text>
          {isLastPlay &&
            <Image
              resizeMode="contain"
              style={styles.lastPlay}
              source={require('./imgs/last-play.png')}
            />
          }
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
    );
  }
  _storeData = async (index) => {
    try {
      await AsyncStorage.setItem('LAST_PLAY_INDEX', index.toString());
      // console.log('store success:', index);
    } catch (error) {
      // Error saving data
      // console.log('Error saving data', error);
    }
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('LAST_PLAY_INDEX');
      if (value !== null) {
        // console.log('get: ', value);
        return value;
      }
      return -1;
     } catch (error) {
       // Error retrieving data
      //  console.log('Error retrieving data', error);
     }
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref="list"
          data={DATA}
          extraData={this.state}
          keyExtractor={item => item.id.toString()}
          renderItem={this._renderCell}
          getItemLayout={(data, index) => (
            {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
          )}
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
    height: ITEM_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  cellText: {
    fontSize: 15,
    width: '90%',
  },
  line: {
    position: 'absolute',
    left: 15,
    bottom: 0.5,
    right: 0,
    height: 0.5,
    backgroundColor: 'lightgray',
  },
  lastPlay: {
    position: 'absolute',
    top: 10,
    right: 15,
    width: 20,
    height: 20,
  },
});
