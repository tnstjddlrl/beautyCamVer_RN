import React, { useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    Dimensions,
    BackHandler,
} from 'react-native';

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

import { WebView } from 'react-native-webview';

import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';

import { buypname, } from '../atoms/atom';


var rnw
var cbc = false;

const ReviewWb = () => {
    const navigation = useNavigation()

    const [atbuyname, setBuyatname] = useRecoilState(buypname)   //웹뷰 제품 이름

    var uri = 'https://m.blog.naver.com/SectionPostSearch.naver?orderType=sim&searchValue=' + atbuyname


    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            function () {
                if (cbc && rnw) {
                    rnw.goBack();
                    return true;
                } else {
                    navigation.goBack();
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
                source={{ uri: uri }}
                style={{ width: '100%', height: '100%' }}
                onNavigationStateChange={(navState) => { cbc = navState.canGoBack; }}
            />
        </SafeAreaView>
    )
}

export default ReviewWb