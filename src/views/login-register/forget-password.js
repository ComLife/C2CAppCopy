import React, { useEffect, useState } from 'react';
import { AppState, Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View, SafeAreaView,   DeviceEventEmitter,

} from 'react-native';
import Header from "../../components/Header";
import { setRatio, setText } from "../../utils/screen-untils";
import {UIColor, Imgs, DeviceEventName, ERROR_CODE} from "../../configs";
import Store from "react-native-simple-store";
import { EasyToast } from "../../components/toast";
import useInterval from "../../components/use-interval";
import { Button } from "space-ui";
import styles from "./styles";
import BaseService from "../../services/base";


const ForgotPassword = (props: any)=>{
    const [phone, setPhone] = useState(''); // 手机号
    const [noteCode, setNoteCode] = useState(''); // 验证码
    const [password, setPassword] = useState(''); // 密码
    const [nextPassword, setNextPassword] = useState(''); // 确认密码
    const [waitTime, setWaitTime] = useState(0);
    const [backgroundTime, setBackgroundTime] = useState(0);
    const [country, setCountry] = useState('');
    const [areaCode, setAreaCode] = useState('');
    const [isVerify, setIsVerify] = useState(false);

    useEffect(() => {
        console.log('ForgotPassword=', props);
        const handleAppStateChange = (nextAppState: any) => {
            if (nextAppState === 'background') {
                // 即将切到后台
                setBackgroundTime(new Date().getTime() / 1000);
            }
            if (nextAppState === 'active') {
                const leftTime = new Date().getTime() / 1000 - backgroundTime;
                let waitTimeCopy = Math.floor(waitTime - leftTime);
                waitTimeCopy = waitTimeCopy <= 0 ? 0 : waitTimeCopy;
                // @ts-ignore
                setWaitTime(waitTimeCopy);
            }
        };

        AppState.addEventListener('change', handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    });

    useEffect(() => {
        Store.get("areaCode").then(areaCode => {
            if (areaCode) {
                setAreaCode(areaCode);
            } else {
                setAreaCode(86);
            }
        });
        Store.get("country").then(country => {
            if (country) {
                setCountry(country);
            } else {
                setCountry("中国大陆");
            }
        });
    }, []);

    const updateCode = res => {
        if (res.view === "ForgotPassword") {
            setAreaCode(res.code);
            setCountry(res.country);
        }
    };

    useEffect(() => {
        DeviceEventEmitter.addListener(
            DeviceEventName.refresh_areaCode,
            updateCode
        );
        return () => {
            DeviceEventEmitter.removeListener(
                DeviceEventName.refresh_areaCode,
                updateCode
            );
        };
    });

    useInterval(
        () => {
            setWaitTime(waitTime - 1);
        },
        // @ts-ignore
        waitTime ? 1000 : null,
    );

    const onBackClick = () => {
        if (isVerify) {
            setIsVerify(false);
            setPassword('');
            setNextPassword('');
        } else {
            props.navigation.goBack();
        }
    };

    const onPressGetCode = async () => {
        Keyboard.dismiss();
        await BaseService.loginpwdCode({ auth_type: 1, auth_data: `+${areaCode}-${phone}` }).then((res)=>{
            if(res.code === ERROR_CODE.SUCCESS){
                EasyToast.show('验证码发送成功，请注意查收');
                setWaitTime(60);
            }else{
                EasyToast.show(res.msg);
            }
        });
    };

    const onComfirClick = async () => {
        Keyboard.dismiss();
        if (password !== nextPassword) {
            console.log('两次密码不一致，请重新输入');
            EasyToast.show('两次密码不一致，请重新输入');
            return;
        }
        await BaseService.loginpwdReset({ auth_type: 1, auth_data: `+${areaCode}-${phone}`, password: password, rand_code: noteCode }).then((res)=>{
            if(res.code === ERROR_CODE.SUCCESS){
                EasyToast.show('密码修改成功');
                Store.save("areaCode", areaCode);
                Store.save("country", country);
                props.navigation.navigate('Login');
            }else{
                EasyToast.show(res.msg);
            }
        });
    };

    const onPhoneChange = (text: string) => {
        setPhone(text);
    };
    const onNoteCodeChange = (text: string) => {
        setNoteCode(text);
    };
    const onPwdChange = (text: string) => {
        setPassword(text);
    };
    const onNextPwdChange = (text: string) => {
        setNextPassword(text);
    };

    const nextIsPress = !(phone && noteCode ? true : false);
    const comfirIsPress = !(password && nextPassword ? true : false);
    return <SafeAreaView>
        <Header onPressLeft={onBackClick} />
        {!isVerify?<View style={styles.loginView}>
            <Text style={styles.titleHeaderText}>找回密码</Text>
            <TouchableOpacity style={styles.countryView} onPress={() => props.navigation.navigate('Internationalization', { view: 'ForgotPassword' })}>
                <Text style={styles.phoneHeader}>{country}</Text>
                <Text style={styles.phoneHeader}>{`+${areaCode}`}</Text>
                <Image source={Imgs.icon_choice} />
            </TouchableOpacity>
            <TextInput
                style={styles.codeInput}
                autoCapitalize="none"
                onChangeText={onPhoneChange}
                keyboardType={'numeric'}
                value={phone}
                placeholderTextColor={UIColor.colorB3}
                placeholder={'手机号'}
            />
            <View style={styles.inputDiving} />
            <View style={styles.getCodeInputView}>
                <TextInput
                    style={styles.noteCodeInput}
                    autoCapitalize="none"
                    onChangeText={onNoteCodeChange}
                    keyboardType={'numeric'}
                    value={noteCode}
                    placeholderTextColor={UIColor.colorB3}
                    placeholder={'验证码'}
                />
                {waitTime === 0 ? (
                    <Text style={[styles.codeText, { color: phone ? UIColor.colorA1 : UIColor.colorB3 }]} onPress={phone ? onPressGetCode : undefined}>
                        获取验证码
                    </Text>
                ) : (
                    <Text style={styles.codeText}>{`${waitTime}s`}</Text>
                )}
            </View>
            <View style={styles.inputDiving} />
            <Button
                style={styles.loginButton}
                disabled={nextIsPress}
                textStyle={styles.btnText}
                onPress={() => setIsVerify(true)}
                disableColor={UIColor.disPressColor}>
                下一步
            </Button>
        </View>:<View style={styles.loginView}>
            <Text style={styles.titleHeaderText}>设置新密码</Text>
            <TextInput
                style={[styles.codeInput, { marginTop: setRatio(80) }]}
                autoCapitalize="none"
                onChangeText={onPwdChange}
                secureTextEntry
                value={password}
                placeholder={'请输入密码'}
            />
            <View style={styles.inputDiving} />
            <TextInput
                style={styles.passInput}
                autoCapitalize="none"
                onChangeText={onNextPwdChange}
                secureTextEntry
                value={nextPassword}
                placeholderTextColor={UIColor.colorB3}
                placeholder={'请再次输入密码'}
            />
            <View style={styles.inputDiving} />
            <Button disabled={comfirIsPress} style={styles.loginButton} textStyle={styles.btnText} onPress={onComfirClick} disableColor={UIColor.disPressColor}>
                确认
            </Button>
        </View>}
    </SafeAreaView>
};

export default ForgotPassword;
