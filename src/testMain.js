import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import { LocalNotification } from './noti';


export default TestMain = () => {

    const navigation = useNavigation()

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('바코드체크')}>
                <Text style={{ fontSize: 20, margin: 20 }}>바코드 스캔</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('사진촬영')}>
                <Text style={{ fontSize: 20, margin: 20 }}>제품 촬영</Text>
            </TouchableWithoutFeedback>

            {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('스크롤메인')}>
                <Text style={{ fontSize: 20 }}>스크롤 메인</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('날씨테스트')}>
                <Text style={{ fontSize: 20 }}>날씨 테스트</Text>
            </TouchableWithoutFeedback> */}

            {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('구매테스트')}>
                <Text style={{ fontSize: 20 }}>구매 테스트</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => LocalNotification()}>
                <Text style={{ fontSize: 20 }}>알림 테스트</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('예약 알림 테스트')}>
                <Text style={{ fontSize: 20 }}>예약 알림 테스트</Text>
            </TouchableWithoutFeedback> */}

            <TouchableWithoutFeedback onPress={() => navigation.navigate('제품등록')}>
                <Text style={{ fontSize: 20, margin: 20 }}>제품등록</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('제품위치')}>
                <Text style={{ fontSize: 20, margin: 20 }}>제품위치 등록</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('실제 메인')}>
                <Text style={{ fontSize: 20, margin: 20 }}>메인</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('로그인')}>
                <Text style={{ fontSize: 20, margin: 20 }}>로그인</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('회원가입')}>
                <Text style={{ fontSize: 20, margin: 20 }}>회원가입</Text>
            </TouchableWithoutFeedback>



        </View>
    )
}