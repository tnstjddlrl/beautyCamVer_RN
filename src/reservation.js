import axios from 'axios';
import React, { useRef, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions
} from 'react-native';

import BackgroundTimer from 'react-native-background-timer';
import { LocalNotification } from './noti';

const Reservation = () => {
    let date1 = new Date(Date.now());
    let date2 = new Date(Date.now());

    date1.setHours(15, 21, 30, 0)
    // date1.setDate(date1.getDate() + 1)


    console.log(date1.valueOf())
    console.log(date1.valueOf() < date2.valueOf())

    BackgroundTimer.runBackgroundTimer(() => {
        console.log('백그라운드 작업')
        if (date1.valueOf() < date2.valueOf()) {
            console.log('시간다됨')
            LocalNotification()
            BackgroundTimer.stopBackgroundTimer()
        }
    }, 9000);

    return (
        <View>
            <Text>예약알림 테스트</Text>
        </View>
    )
}

export default Reservation