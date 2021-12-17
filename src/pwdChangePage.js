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

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { darkmode, pid } from '../atoms/atom';
import AutoHeightImage from 'react-native-auto-height-image';

const back = require('../img/light/back.png')


const chwidth = Dimensions.get('window').width




const PwdChangePage = () => {
    const navigation = useNavigation()
    const [atdarkmode, setAtdarkmode] = useRecoilState(darkmode); //다크모드
    const [atid, setAtid] = useRecoilState(pid); //사용자 아이디

    const [id, setid] = useState('');
    const [pwd, setpwd] = useState('');
    const [pwdc, setpwdc] = useState('');
    const [pwdcDouble, setpwdcDouble] = useState('');


    const request = async () => {
        console.log(id + pwd)

        if (pwdc !== pwdcDouble) {
            Alert.alert('변경할 비밀번호가 일치하지 않습니다!')
            return
        }

        try {
            await axios.get('https://ip0154.cafe24.com/restapi/index.php', {
                params: {
                    type: 'passwordChange',
                    id: atid,
                    pw: pwd,
                    changedpwd: pwdc
                }
            }).then(async (res) => {

                console.log('리턴 : ' + res.data)
                if (res.data == 'pwdCh_suc') {
                    Alert.alert('비밀번호 변경이 완료되었습니다!')

                    setTimeout(() => {
                        navigation.navigate('실제 메인')
                    }, 300);
                } else if (res.data == 'pwdCh_fail1') {
                    Alert.alert('비밀번호 변경 실패!')
                } else if (res.data == 'pwdCh_fail2') {
                    Alert.alert('비밀번호를 확인해주세요!')
                } else if (res.data == 'pwdCh_fail3') {
                    Alert.alert('서버에서 오류가 발생하였습니다.', '잠시후 다시 시도해주세요.')
                }

            })
        } catch (error) {
            console.log(error)
            Alert.alert('서버에서 오류가 발생하였습니다.', '잠시후 다시 시도해주세요.')
        }
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: (atdarkmode == 'light' ? 'white' : 'black') }}>

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
                    <Text style={{ fontSize: 23, color: (atdarkmode == 'light' ? 'black' : 'white'), fontWeight: 'bold' }}>비밀번호 변경</Text>
                    <View style={{ width: 40, height: 40 }}>
                    </View>

                </View>
            </View>
            {/* 헤더 끝 */}

            <ScrollView>
                <View style={{ width: chwidth - 40, borderRadius: 15, backgroundColor: 'white', marginLeft: 20, marginTop: 40, elevation: 10, marginBottom: 20, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(48,48,48)' }}>
                    <View style={{ width: chwidth - 80, marginLeft: 20, marginTop: 20, justifyContent: 'center' }}>

                        {/* 아이디 */}
                        <Text style={{ fontSize: 18, marginTop: 10, color: atdarkmode == 'light' ? 'black' : 'white' }}>아이디</Text>
                        <View style={{ borderWidth: 1, borderColor: atdarkmode === 'light' ? 'rgb(204,204,204)' : 'rgb(48,48,48)', height: 40, marginTop: 10, borderRadius: 3, justifyContent: 'center', backgroundColor: atdarkmode === 'light' ? '#d9d9d9' : '#b3b3b3' }}>
                            <Text style={{ marginLeft: 10 }}>{atid}</Text>
                            {/* <TextInput onChangeText={setid} value={id} style={{ height: 40, width: chwidth - 100, marginLeft: 10, color: 'black' }} placeholder={'아이디를 입력해주세요.'}></TextInput> */}
                        </View>
                        {/* 아이디끝 */}

                        {/* 비밀번호 */}
                        <Text style={{ fontSize: 18, marginTop: 20, color: atdarkmode == 'light' ? 'black' : 'white' }}>현재 비밀번호</Text>
                        <View style={{ borderWidth: 1, borderColor: atdarkmode === 'light' ? 'rgb(204,204,204)' : 'rgb(48,48,48)', height: 40, marginTop: 10, borderRadius: 3, marginBottom: 40, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)' }}>
                            <TextInput textContentType={'password'} secureTextEntry={true} onChangeText={setpwd} value={pwd} placeholderTextColor={atdarkmode === 'light' ? 'black' : 'white'} style={{ height: 40, width: chwidth - 100, marginLeft: 10, color: 'black' }} placeholder={'비밀번호를 입력해주세요.'}></TextInput>
                        </View>
                        {/* 비밀번호끝 */}

                        {/* 비밀번호 */}
                        <Text style={{ fontSize: 18, marginTop: 20, color: atdarkmode == 'light' ? 'black' : 'white' }}>변경할 비밀번호</Text>
                        <View style={{ borderWidth: 1, borderColor: atdarkmode === 'light' ? 'rgb(204,204,204)' : 'rgb(48,48,48)', height: 40, marginTop: 10, borderRadius: 3, marginBottom: 0, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)' }}>
                            <TextInput textContentType={'password'} secureTextEntry={true} onChangeText={setpwdc} value={pwdc} placeholderTextColor={atdarkmode === 'light' ? 'black' : 'white'} style={{ height: 40, width: chwidth - 100, marginLeft: 10, color: 'black' }} placeholder={'비밀번호를 확인해주세요.'}></TextInput>
                        </View>
                        {/* 비밀번호끝 */}

                        {/* 비밀번호 */}
                        <Text style={{ fontSize: 18, marginTop: 20, color: atdarkmode == 'light' ? 'black' : 'white' }}>비밀번호 확인</Text>
                        <View style={{ borderWidth: 1, borderColor: atdarkmode === 'light' ? 'rgb(204,204,204)' : 'rgb(48,48,48)', height: 40, marginTop: 10, borderRadius: 3, marginBottom: 40, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)' }}>
                            <TextInput textContentType={'password'} secureTextEntry={true} onChangeText={setpwdcDouble} value={pwdcDouble} placeholderTextColor={atdarkmode === 'light' ? 'black' : 'white'} style={{ height: 40, width: chwidth - 100, marginLeft: 10, color: 'black' }} placeholder={'비밀번호를 확인해주세요.'}></TextInput>
                        </View>
                        {/* 비밀번호끝 */}

                    </View>
                </View>

            </ScrollView>
            {/* 하단 버튼 시작 */}
            <View style={{ width: chwidth - 40, marginLeft: 20, height: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                <TouchableWithoutFeedback onPress={() => { request() }}>
                    <View style={{ borderRadius: 10, borderWidth: 1, borderColor: atdarkmode === 'light' ? 'rgb(30,40,245)' : 'rgb(48,48,48)', backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(48,48,48)', width: chwidth / 2 - 30, height: 60, alignItems: 'center', justifyContent: 'center', elevation: 10, }}>
                        <Text style={{ fontSize: 23, color: atdarkmode === 'light' ? 'rgb(30,40,245)' : 'white', fontWeight: 'bold' }}>변경</Text>
                    </View>
                </TouchableWithoutFeedback>

                {/* 파랑버튼 */}
                <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                    <View style={{ borderRadius: 10, backgroundColor: atdarkmode === 'light' ? 'rgb(30,40,245)' : '#999999', width: chwidth / 2 - 30, height: 60, alignItems: 'center', justifyContent: 'center', elevation: 10, }}>
                        <Text style={{ fontSize: 23, color: 'white', fontWeight: 'bold' }}>취소</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {/* 하단 버튼 끝 */}

        </SafeAreaView>
    )
}

export default PwdChangePage;