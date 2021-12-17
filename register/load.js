import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
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
import { useRecoilState } from 'recoil';
import { darkmode, floor3rd, pid } from '../atoms/atom';

const Load = () => {
    const navigation = useNavigation()

    const [atid, setAtid] = useRecoilState(pid);
    const [atdarkmode, setAtdarkmode] = useRecoilState(darkmode);
    const [atfloor3rd, setatfloor3rd] = useRecoilState(floor3rd); //3층 설정


    const backAction = () => {
        navigation.goBack()
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@user_id')
            if (value !== null) {
                return value
            } else {
                return 'first'
            }
        } catch (e) {
            Alert.alert('오류가 발생하였습니다.', '앱을 다시 시작해주세요.')
        }
    }

    const getDark = async () => {
        try {
            const value = await AsyncStorage.getItem('@is_dark')
            if (value !== null) {
                return value
            } else {
                return 'light'
            }
        } catch (e) {
            // error reading value
        }
    }

    const get3rd = async () => {
        try {
            const value = await AsyncStorage.getItem('@floor3rd')
            if (value !== null) {
                return value
            } else {
                return 'off'
            }
        } catch (e) {
            Alert.alert('오류가 발생하였습니다.', '앱을 다시 시작해주세요.')
        }
    }

    useEffect(() => {
        getDark().then((res) => {
            setAtdarkmode(res)
        })

        get3rd().then((res) => {
            console.log('????????????3rd' + res)
            setatfloor3rd(res)
        })

        getData().then((res) => {
            if (res == 'first') {
                console.log(res)
                console.log('첫사용자')
                navigation.navigate('로그인')
            } else {
                console.log(res)
                console.log('기존 사용자')
                setAtid(res)

                navigation.navigate('실제 메인')
            }
        })
    }, [])


    return (
        <View style={{ flex: 1 }}>

        </View>
    )
}

export default Load;