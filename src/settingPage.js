import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    Dimensions,
    BackHandler,
    Alert,
    View,
    TouchableWithoutFeedback
} from 'react-native';

import { useNavigation } from '@react-navigation/core';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AutoHeightImage from 'react-native-auto-height-image';
import ToggleSwitch from 'toggle-switch-react-native'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


import { useRecoilState } from 'recoil';
import { darkmode, floor3rd } from '../atoms/atom';

const back = require('../img/light/back.png')

const chwidth = Dimensions.get('window').width

const rightarrow = require('../newimg/all/rightarrow.png')
const settingAxe_light = require('../newimg/light/settingAxe.png')
const settingAxe_dark = require('../newimg/dark/settingAxe.png')

var radio_props = [
    { label: '2층', value: 0 },
    { label: '3층', value: 1 }
];

const SettingPage = () => {
    const navigation = useNavigation()

    const [atdarkmode, setAtdarkmode] = useRecoilState(darkmode); //다크모드
    const [atfloor3rd, setatfloor3rd] = useRecoilState(floor3rd); //3층 설정

    const [expAlert, setExpAlert] = useState(true);

    const [whoRadio, setWhoRadio] = useState(0)

    useEffect(() => {
        // console.log(atfloor3rd)s
        if (atfloor3rd == 'off') {
            setWhoRadio(0)
        } else {
            setWhoRadio(1)
        }
    }, [])

    // 백핸들러
    const backAction = () => {
        navigation.goBack()
        return true;
    };
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
    // 백핸들러 끝



    const setfloor3rd = async (value) => {
        try {
            await AsyncStorage.setItem('@floor3rd', value)
        } catch (e) {
            console.log(e)
        }
    }

    function radioClick(i) {
        console.log(i)
        setWhoRadio(i)

        if (i == 0) {
            setatfloor3rd('off')
            try {
                setfloor3rd('off')
            } catch (error) {
                console.log(error)
            }
            console.log('off')
        } else {
            setatfloor3rd('on')
            console.log('on')
            try {
                setfloor3rd('on')
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <SafeAreaView style={{ backgroundColor: (atdarkmode == 'light' ? 'white' : 'black'), width: '100%', height: '100%' }}>
            {/* 헤더 시작 */}
            <View style={{ width: '100%', height: 60, justifyContent: 'center' }}>

                <View style={{ marginLeft: 20, width: chwidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <View style={{}}>
                        <TouchableWithoutFeedback onPress={() => {
                            console.log('클릭')
                            navigation.navigate('로그인')
                        }}>
                            <Text style={{ fontWeight: 'bold', color: atdarkmode === 'light' ? 'black' : '#f2f2f2' }}>로그아웃</Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <Text style={{ fontSize: 21, color: atdarkmode === 'light' ? 'black' : 'white', fontWeight: 'bold' }}>설정</Text>

                    {/* < 시작 */}
                    <TouchableWithoutFeedback onPress={() => { navigation.goBack(); }}>
                        <View style={{ width: 40, height: 40, borderRadius: 25, alignItems: 'center', justifyContent: 'center', }}>
                            <AutoHeightImage source={atdarkmode == 'light' ? settingAxe_light : settingAxe_dark} width={18}></AutoHeightImage>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* < 끝 */}

                </View>

            </View>
            {/* 헤더 끝 */}

            {/* 본문 시작 */}
            <View style={{ flex: 1 }}>

                {/*  */}
                <TouchableWithoutFeedback onPress={() => { navigation.navigate('비밀번호수정') }}>
                    <View style={{ width: chwidth - 60, height: 60, marginLeft: 30, marginTop: 20, }}>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: atdarkmode === 'light' ? 'black' : '#f2f2f2' }}>비밀번호 변경</Text>
                            <AutoHeightImage source={rightarrow} width={10}></AutoHeightImage>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ width: '100%', borderWidth: 0.3, borderColor: '#f2f2f2' }}></View>
                {/* // */}

                {/*  */}
                <View style={{ width: chwidth - 60, height: 90, marginLeft: 30 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: atdarkmode === 'light' ? 'black' : '#f2f2f2' }}>냉장고 칸수 설정</Text>

                        <View style={{ marginLeft: -10 }}>
                            <RadioForm
                                formHorizontal={true}
                                animation={true}>
                                {
                                    radio_props.map((obj, i) => (
                                        <RadioButton labelHorizontal={true} key={i} >
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}
                                                isSelected={whoRadio === i}
                                                onPress={() => { radioClick(i) }}
                                                borderWidth={0.7}
                                                buttonInnerColor={'rgb(37,55,126)'}
                                                buttonOuterColor={whoRadio === i ? 'rgb(37,55,126)' : 'gray'}
                                                buttonSize={12}
                                                buttonOuterSize={20}
                                                buttonStyle={{}}
                                                buttonWrapStyle={{ marginLeft: 10 }}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                labelHorizontal={true}
                                                onPress={() => { radioClick(i) }}
                                                labelStyle={{ fontSize: 13, color: atdarkmode === 'light' ? 'black' : '#f2f2f2' }}
                                                labelWrapStyle={{}}
                                            />
                                        </RadioButton>
                                    ))
                                }
                            </RadioForm>
                        </View>

                    </View>
                </View>
                <View style={{ width: '100%', borderWidth: 0.3, borderColor: '#f2f2f2' }}></View>
                {/* // */}

                <View style={{ width: chwidth - 60, height: 60, marginLeft: 30 }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: atdarkmode === 'light' ? 'black' : '#f2f2f2' }}>유통기한 알림</Text>
                        <ToggleSwitch
                            isOn={expAlert}
                            onColor="rgb(37,55,126)"
                            offColor="gray"
                            size="small"
                            onToggle={isOn => {
                                console.log("changed to : ", isOn)
                                setExpAlert(isOn);
                            }}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', borderWidth: 0.3, borderColor: '#f2f2f2' }}></View>

                <TouchableWithoutFeedback onPress={() => { navigation.navigate('내부사진보기') }}>
                    <View style={{ width: chwidth - 60, height: 60, marginLeft: 30, marginTop: 0, }}>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: atdarkmode === 'light' ? 'black' : '#f2f2f2' }}>내부사진 보기</Text>
                            <AutoHeightImage source={rightarrow} width={10}></AutoHeightImage>
                        </View>
                    </View>
                </TouchableWithoutFeedback>


                <View style={{ width: '100%', borderWidth: 0.3, borderColor: '#f2f2f2' }}></View>



            </View>
            {/* 본문 끝 */}


        </SafeAreaView>
    )
}

export default SettingPage