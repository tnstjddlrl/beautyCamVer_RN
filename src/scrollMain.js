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
    TouchableOpacity,
} from 'react-native';

const Item = () => {
    return (
        <TouchableWithoutFeedback>
            <View style={{ width: 100, justifyContent: 'center', alignItems: 'center' }}>
                <Text>안녕!</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const ItemPush = () => {
    var list = []
    for (var i = 0; i < 10; i++) {
        list.push(<Item key={i}></Item>)
    }
    return list;
}

const ScrollMain = () => {

    const [curX, setCurX] = useState(0)


    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <Text>스크롤 테스트</Text>

            <View>
                <ScrollView style={{ width: '70%' }} horizontal={true} showsHorizontalScrollIndicator={false} onScroll={(data) => console.log(data.nativeEvent.contentOffset.x)} >
                    <ItemPush></ItemPush>

                </ScrollView>
            </View>



        </SafeAreaView>
    )
}

export default ScrollMain