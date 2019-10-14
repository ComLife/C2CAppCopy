import React, {Fragment} from 'react';
import {DeviceEventEmitter, Image, SectionList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Header from '../../components/Header';
import countryState from '../../configs/countries';
import styles from './styles';
import {setRatio} from '../../utils/screen-untils';
import {DeviceEventName, Imgs} from '../../configs';

export default class Internationalization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: [
        {
          title: '#',
          data: [
            {
              code: '86',
              flag: 'CN',
              name: '中国大陆',
              format: 'XXX XXXX XXXX',
              pinyin: 'zhong guo da lu',
              index: 'Z',
            },
            {
              code: '852',
              flag: 'HK',
              name: '中国香港',
              format: 'X XXX XXXX',
              pinyin: 'zhong guo xiang gang',
              index: 'Z',
            },
            {
              code: '853',
              flag: 'MO',
              name: '中国澳门',
              format: 'XXXX XXXX',
              pinyin: 'zhong guo ao men',
              index: 'Z',
            },
            {
              code: '886',
              flag: 'TW',
              name: '中国台湾',
              format: 'XXX XXX XXX',
              pinyin: 'zhong guo tai wan',
              index: 'Z',
            },
          ],
        },
      ],
      countryChar: ['#'],
      searchCountryList: [],
      searchCountryCharList: [],
      searchCountry: '',
      searchChar: '#',
    };
    this.createCountryListData();
  }

  createCountryListData = () => {
    const charArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < charArray.length; i += 1) {
      const countryObj = {title: '', data: []};
      countryObj.title = charArray[i];
      for (let j = 0; j < countryState.length; j += 1) {
        if (countryObj.title === countryState[j].index && countryState[j].index !== '') {
          countryObj.data.push(countryState[j]);
        }
      }
      if (countryObj.data.length) {
        const {countryList, countryChar} = this.state;
        this.setState({
          countryList: countryList.push(countryObj),
          countryChar: countryChar.push(countryObj.title),
        });
      }
    }
  };

  _sectionComp = info => {
    const txt = info.section.title;
    return (
      <View style={styles.subHeadView}>
        <Text style={styles.subHeading}>{txt === '#' ? '常用' : txt}</Text>
      </View>
    );
  };

  onRegister = info => {
    const view = this.props.navigation.getParam('view');
    DeviceEventEmitter.emit(DeviceEventName.refresh_areaCode, {
      view,
      code: info.code,
      country: info.name,
    });
    this.props.navigation.goBack();
  };

  _renderItem = info => {
    const countryTxt = info.item.name;
    const areaCode = `+${info.item.code}`;

    return (
      <TouchableOpacity style={styles.itemView} onPress={() => this.onRegister(info.item)}>
        <Text style={styles.countryTxt}>{countryTxt}</Text>
        <Text style={styles.areaTxt}>{areaCode}</Text>
      </TouchableOpacity>
    );
  };

  jump = info => {
    this.sectionList.scrollToLocation({
      sectionIndex: info.index,
      itemIndex: 0,
      viewOffset: setRatio(45),
    });
    this.setState({searchChar: info.item});
  };

  _charRenderItem = countryCharList =>
    countryCharList.map((item, index) => (
      <Text
        key={index}
        style={[
          styles.charTxt,
          {
            color: this.state.searchChar === item ? '#5171ec' : '#37374a',
            opacity: item === '#' ? 0 : 1,
          },
        ]}
        onPress={() => this.jump({item, index})}>
        {item}
      </Text>
    ));

  checkStringType = char => {
    const pattern = new RegExp('[\u4E00-\u9FA5]+');
    const pattern2 = new RegExp('[A-Za-z]+');
    const pattern3 = new RegExp('[0-9]+');
    if (pattern.test(char)) {
      return 1;
    }
    if (pattern2.test(char)) {
      return 2;
    }
    if (pattern3.test(char)) {
      return 3;
    }
    return null;
  };

  createSearchCountryListData = (charArray, _countryState) => {
    const _searCharArray = [];
    const _searCharCountryArray = [];
    const _comUseArray = [];
    const comUseObg = {title: '#', data: []};
    for (let i = 0; i < _countryState.length; i += 1) {
      if (_countryState[i].name && _countryState[i].name.indexOf('中国') >= 0) {
        comUseObg.data.push(_countryState[i]);
      }
    }
    if (comUseObg.data.length) {
      _comUseArray.push(comUseObg);
    }
    for (let i = 0; i < charArray.length; i += 1) {
      const countryObj = {title: '', data: []};
      countryObj.title = charArray[i];
      for (let j = 0; j < _countryState.length; j += 1) {
        if (countryObj.title === _countryState[j].index && _countryState[j].index !== '') {
          countryObj.data.push(_countryState[j]);
        }
      }
      if (countryObj.data.length) {
        _searCharCountryArray.push(countryObj);
        _searCharArray.push(countryObj.title);
      }
    }
    this.setState({
      searchCountryList: _comUseArray.concat(_searCharCountryArray),
      searchCountryCharList: _searCharArray,
    });
  };

  searchCountryArray = searchCountry => {
    const searchCountryArray = [];
    const searchCountryCharArray = [];
    this.setState({searchCountry});
    const charType = this.checkStringType(searchCountry[0]);
    for (let i = 0; i < countryState.length; i += 1) {
      if (JSON.stringify(countryState[i]).indexOf(searchCountry) >= 0) {
        searchCountryArray.push(countryState[i]);
      }
    }
    searchCountryArray.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      }
      if (a.index < b.index) {
        return -1;
      }
      return 0;
    });
    for (let j = 0; j < searchCountryArray.length; j += 1) {
      if (!searchCountryCharArray.includes(searchCountryArray[j].index)) {
        searchCountryCharArray.push(searchCountryArray[j].index);
      }
    }
    this.createSearchCountryListData(searchCountryCharArray, searchCountryArray);
  };

  _ItemSeparatorComponent = () => <View style={{backgroundColor: '#f5f5f7', height: 1}} />;

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header navigation={this.props.navigation} leftTitle="" title="国家地区" leftImage={Imgs.back} />
        <View style={styles.inputDiving} />
        <View style={styles.searchView}>
          <Image source={Imgs.icon_search} style={{marginLeft: setRatio(32)}} />
          <TextInput
            style={styles.input}
            placeholder="请搜索国家和地区"
            autoCapitalize="none"
            placeholderTextColor="#afb5c3"
            onChangeText={searchCountry => this.searchCountryArray(searchCountry)}
            value={this.state.searchCountry}
          />
        </View>
        <View style={{flex: 1}}>
          <SectionList
            initialNumToRender={270}
            // eslint-disable-next-line no-return-assign
            ref={ref => (this.sectionList = ref)}
            renderSectionHeader={this._sectionComp}
            renderItem={this._renderItem}
            sections={this.state.searchCountry ? this.state.searchCountryList : this.state.countryList}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={this._ItemSeparatorComponent}
            onEndReachedThreshold={0.1}
            stickySectionHeadersEnabled={false}
            onScrollToIndexFailed={() => {}}
          />
          <View style={styles.flatChar}>{this._charRenderItem(this.state.searchCountry ? this.state.searchCountryCharList : this.state.countryChar)}</View>
        </View>
      </SafeAreaView>
    );
  }
}
