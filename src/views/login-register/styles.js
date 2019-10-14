import {StyleSheet} from 'react-native';
import {setRatio, setText} from '../../utils/screen-untils';
import {UIColor} from '../../configs';

export default StyleSheet.create({
  loginView: {
    marginHorizontal: setRatio(45),
  },
  titleHeaderImage: {
    width: setRatio(315),
    height: setRatio(55),
    resizeMode: 'contain',
  },
  codeInput: {
    height: setRatio(70),
    fontWeight: 'bold',
    marginTop: setRatio(30),
    fontSize: setText(27),
    color: UIColor.colorB1,
  },
  countryView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: setRatio(60),
    height: setRatio(80),
  },
  phoneHeader: {
    fontSize: setText(24),
    color: UIColor.colorB1,
    fontWeight: 'bold',
    marginRight: setRatio(10),
  },
  inputDiving: {
    height: setRatio(2),
    backgroundColor: UIColor.colorB4,
  },
  passInput: {
    height: setRatio(70),
    fontWeight: 'bold',
    marginTop: setRatio(50),
    fontSize: setText(27),
    color: UIColor.colorB1,
  },
  loginButton: {
    marginTop: 50,
    height: setRatio(74),
    backgroundColor: UIColor.btnOnpressColor,
  },
  btnText: {
    fontWeight: 'bold',
    color: UIColor.whiteColor,
    fontSize: setText(27),
  },
  forgotPassText: {
    marginTop: setRatio(30),
    fontSize: setText(22),
    width: setRatio(100),
    color: UIColor.colorA1,
  },
  registerTextView: {
    flexDirection: 'row',
    marginBottom: setRatio(50),
    marginTop: setRatio(150),
  },
  registerText: {
    fontSize: setText(27),
    color: UIColor.colorB3,
  },
  onRegisterText: {
    fontSize: setText(27),
    color: UIColor.colorA1,
    fontWeight: 'bold',
  },
  registerTitle: {
    marginTop: setRatio(60),
    fontSize: setText(42),
    color: UIColor.colorB1,
    fontWeight: 'bold',
  },
  getCodeInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: setRatio(70),
    marginTop: setRatio(50),
    justifyContent: 'space-between',
  },
  noteCodeInput: {
    flex: 1,
    height: setRatio(70),
    fontWeight: 'bold',
    fontSize: setText(27),
    color: UIColor.colorB1,
  },
  codeText: {
    fontSize: setRatio(27),
    color: UIColor.colorA1,
  },

  container: {
    flex: 1,
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: setRatio(24),
    marginVertical: setRatio(15),
    height: setRatio(60),
    borderRadius: setRatio(5),
    backgroundColor: '#f5f6fb',
  },
  input: {
    opacity: 0.5,
    flex: 1,
    height: setRatio(60),
    fontSize: setText(20),
    marginLeft: setRatio(20),
  },
  subHeadView: {
    height: setRatio(45),
    backgroundColor: '#f5f6fb',
    justifyContent: 'center',
  },
  subHeading: {
    fontSize: setText(20),
    color: '#37374a',
    marginLeft: setText(25),
  },
  itemView: {
    flexDirection: 'row',
    height: setText(75),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: setText(24),
  },
  countryTxt: {
    fontSize: setText(24),
    color: '#37374a',
  },
  areaTxt: {
    fontSize: setText(24),
    color: '#5171ec',
    fontWeight: 'bold',
    marginRight: setRatio(40),
  },
  charTxt: {
    width: setRatio(50),
    textAlign: 'center',
    flex: 1,
  },
  flatChar: {
    position: 'absolute',
    right: setRatio(10),
    alignItems: 'center',
    width: setRatio(30),
    top: setRatio(10),
    bottom: setRatio(10),
  },
  titleHeaderText: {
    marginTop: setRatio(50),
    fontSize: setText(42),
    color: UIColor.colorB1,
    fontWeight: 'bold',
  },
});
