import axios from 'axios';
import React, { useRef, useState, useEffect, } from 'react';
const cheerio = require('cheerio');
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
    Alert,
    TouchableWithoutFeedback,
    BackHandler,
    Modal
} from 'react-native';

import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import AutoHeightImage from 'react-native-auto-height-image';
import { useRecoilState } from 'recoil';
import { darkmode, pname } from '../atoms/atom';
import { useNavigation } from '@react-navigation/native';

const chwidth = Dimensions.get('screen').width
const chheight = Dimensions.get('screen').height

const back = require('../img/light/back.png')
const noiconLight = require('../img/light/no_icon.png')
const noiconBlack = require('../img/dark/d_no_icon.png')



export default BarcodeCheck = () => {

    const backAction = () => {
        navigation.goBack()
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const navigation = useNavigation()
    const camera = useRef()
    const [barcc, setBarcc] = useState('바코드 탐지중!')
    const [product, setproduct] = useState('')

    const [atname, setAtname] = useRecoilState(pname)   //제품이름

    const [atdarkmode, setAtdarkmode] = useRecoilState(darkmode); //다크모드

    const [modalview, setModalView] = useState(false)



    function barcodeCheck(pp) {
        // 8809482500662
        var regex = /[]|[\[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;

        axios.get('http://www.koreannet.or.kr/home/hpisSrchGtin.gs1?gtin=' + pp,
        ).then(function (response) {

            const $ = cheerio.load(response.data);

            var test = $('div.productDetailView').find('div.productTit').text();

            var arr = test.trim().substring(13, test.length).trim().split(' ')
            var target = arr.indexOf($('div.productDetailView').find('dd.productDetail').find('dl').find('dd:nth-of-type(2)').text())


            if (arr.indexOf($('div.productDetailView').find('dd.productDetail').find('dl').find('dd:nth-of-type(2)').text()) < 0) {

                setAtname(arr.join(' '))

                setTimeout(() => {
                    navigation.navigate('제품등록')
                }, 300);
            } else {
                arr.splice(arr.indexOf($('div.productDetailView').find('dd.productDetail').find('dl').find('dd:nth-of-type(2)').text()), 1)
                // arr.splice(arr.length - 1, 1, arr[arr.length - 1].replace(/ /g, ""))

                if (arr.join(' ') == '') {

                    // Alert.alert('등록된 정보가 없습니다.')
                    setModalView(true)
                    setTimeout(() => {
                        setModalView(false)
                    }, 1000)
                    return;
                }

                setAtname(arr.join(' '))

                setTimeout(() => {
                    navigation.navigate('제품등록')
                }, 300);
            }


        }).catch(function (error) {
            Alert.alert('인터넷 연결을 확인')
            console.log(error);
        })


    }


    return (
        <SafeAreaView style={{ width: '100%', height: '100%', alignItems: "center", backgroundColor: 'white' }}>
            <RNCamera
                ref={camera}
                style={{ width: chwidth, height: chheight - 230, alignSelf: "center", backgroundColor: 'white', marginBottom: -40 }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                androidCameraPermissionOptions={{
                    title: '카메라 사용 권한',
                    message: '카메라 사용 권한 허용이 필요합니다.',
                    buttonPositive: '확인',
                    buttonNegative: '거절',
                }}
                onBarCodeRead={(data) => {
                    barcodeCheck(data.data)

                }}>
                <BarcodeMask
                    width={300} height={200} showAnimatedLine={true} outerMaskOpacity={0.4} animatedLineColor={'red'}
                />
            </RNCamera>

            {/* 푸터 시작  */}
            <View style={{ width: '100%', backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(48,48,48)' }}>
                <View style={{ width: chwidth - 20, height: '100%', marginLeft: 10, alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ width: chwidth - 100, textAlign: 'center', fontSize: 15, color: atdarkmode === 'light' ? 'black' : 'white' }}>인식이 안되거나 바코드가 없는 경우 아래에 {'\n'} 직접등록 버튼을 이용해주세요</Text>

                    <TouchableWithoutFeedback onPress={() => { navigation.navigate('제품등록') }}>
                        <View style={{ width: chwidth - 40, marginLeft: 10, marginTop: 20, marginBottom: 20, borderRadius: 50, borderWidth: 1.5, borderColor: atdarkmode === 'light' ? 'black' : 'white', backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(48,48,48)', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white', fontSize: 22, fontWeight: 'bold', margin: 15 }}>직접등록</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
            {/* 푸터 끝 */}

            {/* 헤더 시작 */}
            <View style={{ width: '100%', height: 60, justifyContent: 'center', position: 'absolute', backgroundColor: 'rgba(255, 255, 255,0.4)' }}>

                <View style={{ marginLeft: 20, width: chwidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* < 시작 */}
                    <TouchableWithoutFeedback onPress={() => { console.log('뒤클릭'), navigation.goBack() }}>
                        <View style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
                            <AutoHeightImage source={back} width={30}></AutoHeightImage>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* < 끝 */}

                    <Text style={{ fontSize: 20, color: 'black', letterSpacing: -0.9 }}>화장품의 바코드를 찍어주세요</Text>


                    <View style={{ width: 40, height: 40 }}>

                    </View>


                </View>

            </View>
            {/* 헤더 끝 */}

            <Modal visible={modalview} transparent={true}>
                <SafeAreaView style={{ alignItems: 'center', width: '100%' }}>
                    <View style={{ alignItems: 'center', marginTop: '50%', backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(48,48,48)', borderRadius: 10 }}>
                        <AutoHeightImage source={atdarkmode === 'light' ? noiconLight : noiconBlack} style={{ marginTop: 20 }} width={30}></AutoHeightImage>
                        <View style={{ alignItems: 'center', padding: 20 }}>
                            <Text style={{ fontSize: 15, letterSpacing: -1 }}>바코드가 코리아넷에 존재하지 않습니다.</Text>
                            <Text style={{ fontSize: 15, letterSpacing: -1 }}>하단의 직접등록 버튼을 이용해주세요.</Text>

                        </View>


                    </View>

                </SafeAreaView>

            </Modal>

        </SafeAreaView>
    )
}
