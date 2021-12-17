import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import {
    Alert,
    View,
    BackHandler,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
    TextInput,
} from 'react-native';



import {
    Slider,
    Stack,
    Box,
    Center,
    NativeBaseProvider,
    Select,
    CheckIcon,
    ChevronLeftIcon
} from "native-base"
import AutoHeightImage from 'react-native-auto-height-image';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { pid } from '../atoms/atom';

const chwidth = Dimensions.get('window').width

const check_img = require('../img/light/check.png')
const loca_img = require('../img/light/location_icon.png')
const back = require('../img/light/back.png')


const Register = () => {

    const navigation = useNavigation()

    const [atid, setAtid] = useRecoilState(pid); //사용자 아이디

    const [id, setid] = useState('');
    const [pwd, setpwd] = useState('');
    const [pwdc, setpwdc] = useState('');
    const [email, setemail] = useState('');

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@user_id', value)
        } catch (e) {
            console.log(e)
        }
    }


    const request = async () => {
        console.log(id + pwd)
        try {
            await axios.get('https://ip0154.cafe24.com/restapi/index.php', {
                params: {
                    type: 'register',
                    id: id,
                    pw: pwd,
                    email: email
                }
            }).then(async (res) => {

                console.log('리턴 : ' + res.data)
                if (res.data == 'idid') {
                    Alert.alert('중복되는 아이디가 존재합니다!')
                } else if (res.data == 'register_suc') {
                    setAtid(id)
                    storeData(id)

                    setTimeout(() => {
                        navigation.navigate('실제 메인')
                    }, 300);
                }
                else if (res.data == 'register_fail') {
                    Alert.alert('서버에서 오류가 발생하였습니다.', '잠시후 다시 시도해주세요.')
                }

            })
        } catch (error) {
            console.log(error)
            Alert.alert('서버에서 오류가 발생하였습니다.', '잠시후 다시 시도해주세요.')

        }
    }

    return (
        <NativeBaseProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(240,240,240)' }}>

                {/* 헤더 시작 */}
                <View style={{ width: '100%', height: 60, justifyContent: 'center' }}>
                    <View style={{ marginLeft: 20, width: chwidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* < 시작 */}
                        <TouchableWithoutFeedback onPress={() => { console.log('뒤클릭'), navigation.goBack() }}>
                            <View style={{ width: 40, height: 40, borderRadius: 25, alignItems: 'center', justifyContent: 'center', }}>
                                <AutoHeightImage source={back} width={35}></AutoHeightImage>
                            </View>
                        </TouchableWithoutFeedback>
                        {/* < 끝 */}
                        <Text style={{ fontSize: 23, color: 'black', fontWeight: 'bold' }}>회원가입</Text>
                        <View style={{ width: 40, height: 40 }}>
                        </View>

                    </View>
                </View>
                {/* 헤더 끝 */}

                <ScrollView>
                    <View style={{ width: chwidth - 40, borderRadius: 15, backgroundColor: 'white', marginLeft: 20, marginTop: 40, elevation: 10, marginBottom: 20 }}>
                        <View style={{ width: chwidth - 80, marginLeft: 20, marginTop: 20, justifyContent: 'center' }}>

                            {/* 아이디 */}
                            <Text style={{ fontSize: 18, marginTop: 10, color: 'black' }}>아이디</Text>
                            <View style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', height: 40, marginTop: 10, borderRadius: 3 }}>
                                <TextInput onChangeText={setid} value={id} style={{ height: 40, width: chwidth - 100, marginLeft: 10, color: 'black' }} placeholder={'아이디를 입력해주세요.'}></TextInput>
                            </View>

                            {/* 아이디끝 */}

                            {/* 비밀번호 */}
                            <Text style={{ fontSize: 18, marginTop: 20 }}>비밀번호</Text>
                            <View style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', height: 40, marginTop: 10, borderRadius: 3 }}>
                                <TextInput textContentType={'password'} secureTextEntry={true} onChangeText={setpwd} value={pwd} style={{ height: 40, width: chwidth - 100, marginLeft: 10, color: 'black' }} placeholder={'비밀번호를 입력해주세요.'}></TextInput>
                            </View>

                            {/* 비밀번호끝 */}

                            {/* 비밀번호 */}
                            <Text style={{ fontSize: 18, marginTop: 20 }}>비밀번호 확인</Text>
                            <View style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', height: 40, marginTop: 10, borderRadius: 3, marginBottom: 0 }}>
                                <TextInput textContentType={'password'} secureTextEntry={true} onChangeText={setpwdc} value={pwdc} style={{ height: 40, width: chwidth - 100, marginLeft: 10, color: 'black' }} placeholder={'비밀번호를 확인해주세요.'}></TextInput>
                            </View>

                            {/* 비밀번호끝 */}

                            {/* 비밀번호 */}
                            <Text style={{ fontSize: 18, marginTop: 20 }}>이메일</Text>
                            <View style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', height: 40, marginTop: 10, borderRadius: 3, marginBottom: 40 }}>
                                <TextInput onChangeText={setemail} value={email} style={{ height: 40, width: chwidth - 100, marginLeft: 10, color: 'black' }} placeholder={'이메일을 확인해주세요.'}></TextInput>
                            </View>

                            {/* 비밀번호끝 */}

                        </View>
                    </View>
                </ScrollView>


                {/* 하단 버튼 시작 */}
                <View style={{ width: chwidth - 40, marginLeft: 20, height: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <TouchableWithoutFeedback onPress={() => { request() }}>
                        <View style={{ borderRadius: 10, borderWidth: 1, borderColor: 'rgb(30,40,245)', backgroundColor: 'white', width: chwidth / 2 - 30, height: 60, alignItems: 'center', justifyContent: 'center', elevation: 10, }}>
                            <Text style={{ fontSize: 23, color: 'rgb(30,40,245)', fontWeight: 'bold' }}>회원가입</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* 파랑버튼 */}
                    <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                        <View style={{ borderRadius: 10, backgroundColor: 'rgb(30,40,245)', width: chwidth / 2 - 30, height: 60, alignItems: 'center', justifyContent: 'center', elevation: 10, }}>
                            <Text style={{ fontSize: 23, color: 'white', fontWeight: 'bold' }}>취소</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* 하단 버튼 끝 */}

            </SafeAreaView>
        </NativeBaseProvider >
    )
}

export default Register