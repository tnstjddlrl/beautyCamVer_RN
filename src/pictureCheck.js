import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import { useRecoilState } from 'recoil';
import { imagebase64 } from '../atoms/atom';

const PictureCheck = () => {
    const [atbase64, setatbase64] = useRecoilState(imagebase64)

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <Image source={{ uri: 'data:jpeg/png;base64,' + atbase64 }} style={{ width: 100, height: 200, backgroundColor: 'skyblue' }}></Image>
        </View>
    )
}

export default PictureCheck