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

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hwbp",
            function () {
                if (cbc && rnw) {
                    rnw.goBack();
                    return true;
                }
            }
        );
        return () => backHandler.remove();
    }, []);

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
                source={{ uri: 'https://msearch.shopping.naver.com/search/all?query=부케가르니 핸드크림&bt=2&frm=MOSCPRO' }}
                style={{ width: '100%', height: '100%' }}
                onNavigationStateChange={(navState) => { cbc = navState.canGoBack; }}
            />

        </SafeAreaView>
    )
}

export default WbBuy