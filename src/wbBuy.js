import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react';
import {
    Alert,
    View,
    BackHandler,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';

import { WebView } from 'react-native-webview';

var rnw
var cbc = false;

const WbBuy = () => {
    const navigation = useNavigation()

    const backAction = () => {
        navigation.goBack()
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const [atbuyname, setBuyatname] = useRecoilState(buypname)   //웹뷰 제품 이름

    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <WebView
                ref={wb => { rnw = wb }}
                onMessage={event => {
                    console.log(event.nativeEvent.data);
                    Alert.alert(event.nativeEvent.data);
                }}
                onLoadEnd={() => {
                    rnw.postMessage('hello')
                }}
                source={{ uri: `https://msearch.shopping.naver.com/search/all?query=${atbuyname}&bt=2&frm=MOSCPRO` }}
                style={{ width: '100%', height: '100%' }}
                onNavigationStateChange={(navState) => { cbc = navState.canGoBack; }}
            />
        </SafeAreaView>
    )
}

export default WbBuy