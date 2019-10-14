import React, {Component} from 'react';
import {Animated, Dimensions, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {setRatio, setText} from '../utils/screen-untils';
const iphoneXWidth = 375;
const iphoneXHeight = 812;
const iphoneXXWidth = 414;
const iphoneXXHeight = 896;

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const isIphoneX = () => {
  return (
    Platform.OS === 'ios' &&
    ((ScreenWidth === iphoneXWidth && ScreenHeight === iphoneXHeight) || (ScreenHeight === iphoneXWidth && ScreenWidth === iphoneXHeight))
  );
};
const isIphoneXX = () => {
  return (
    Platform.OS === 'ios' &&
    ((ScreenWidth === iphoneXXWidth && ScreenHeight === iphoneXXHeight) || (ScreenHeight === iphoneXXWidth && ScreenWidth === iphoneXXHeight))
  );
};
const statusBarHeight = isIphoneX() || isIphoneXX() ? 44 : Platform.OS === 'android' ? StatusBar.currentHeight : 22;
// console.log('statusBarHeight===', statusBarHeight);
const totalHeight = statusBarHeight + setRatio(70);
// console.log('statusBarHeight totalHeight===', totalHeight);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
    width: ScreenWidth,
    height: ScreenHeight,
  },
  content: {
    backgroundColor: '#000',
    width: ScreenWidth,
    height: totalHeight,
    justifyContent: 'flex-end',
    paddingBottom: setRatio(20),
    paddingHorizontal: setRatio(20),
    alignItems: 'center',
    opacity: 0.9,
  },
  text: {
    color: 'white',
    fontSize: setText(24),
    textAlign: 'center',
  },
});

export class EasyToast {
  static bind(toast) {
    if (!this.map.toast) {
      toast && (this.map.toast = toast);
    }
  }

  static unBind() {
    this.map.toast = null;
    delete this.map.toast;
  }

  static show(text, type = '') {
    if (text) {
      this.map.toast.show(text, type);
    }
  }

  // 切换页面时,如果有显示,立刻关闭
  static switchRoute() {
    if (this.map.toast && this.map.toast.state.isShow) {
      this.dismis();
    }
  }

  static dismis() {
    this.map.toast.close();
  }
}

EasyToast.map = {};

export const DURATION = {
  LENGTH_SHORT: 500,
  FOREVER: 0,
};

export class Toast extends Component {
  static propTypes = {
    isAdded: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      text: '',
      // opacityValue: new Animated.Value(0.75),
      translateY: new Animated.Value(-totalHeight),
      // keyboardHeight: 0,
      // type: '',
    };
    if (!this.props.isAdded) {
      EasyToast.bind(this);
    }
  }

  componentWillUnmount() {
    this.isUnmount = true;
    if (!this.props.isAdded) {
      this.timer && clearTimeout(this.timer);
      EasyToast.unBind();
    }
  }

  close(duration) {
    let delay = typeof duration === 'undefined' ? this.duration : duration;

    if (delay === DURATION.FOREVER) {
      delay = this.props.defaultCloseDelay || 1000;
    }

    if (!this.isShow && !this.state.isShow) {
      return;
    }
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      Animated.timing(this.state.translateY, {
        toValue: -totalHeight,
        duration: 200,
      }).start(() => {
        if (this.isUnmount) {
          return;
        }
        this.setState({
          isShow: false,
        });
        this.isShow = false;
        if (typeof this.callback === 'function') {
          this.callback();
        }
      });
    }, delay);
  }

  show(text, type, duration, callback) {
    this.duration = typeof duration === 'number' ? duration : 1000;
    this.callback = callback;
    this.setState({
      isShow: true,
      text,
      // type,
    });

    Animated.timing(this.state.translateY, {
      toValue: 0,
      duration: 200,
    }).start(() => {
      this.isShow = true;
      if (duration !== DURATION.FOREVER) {
        this.close();
      }
    });
  }

  render() {
    const view = this.state.isShow ? (
      <View style={[styles.container]} pointerEvents="none">
        <Animated.View style={[styles.content, {transform: [{translateY: this.state.translateY}]}, {position: 'absolute'}]}>
          <Text style={styles.text}>{this.state.text}</Text>
        </Animated.View>
      </View>
    ) : null;
    return view;
  }
}
