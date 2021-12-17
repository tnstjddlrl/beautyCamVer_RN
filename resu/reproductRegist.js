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
    StyleSheet
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import {
    Slider,
    NativeBaseProvider,
    Select,
    CheckIcon,
} from "native-base"

import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import SelectDropdown from "react-native-select-dropdown";


import DatePicker from 'react-native-date-picker'
import AutoHeightImage from 'react-native-auto-height-image';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { darkmode, pcategory, pexp, pexpDate, pname, repcategory, repexp, repexpDate, repname } from '../atoms/atom';

const back = require('../img/light/back.png')
const dateicon = require('../img/light/date.png')


const select_arrow = require('../newimg/light/select_arrow.png')
const d_select_arrow = require('../newimg/dark/d_select_arrow.png')

const chwidth = Dimensions.get('window').width

const thisday = new Date(Date.now());

const ReproductRegist = () => {

    const navigation = useNavigation()
    const bottomSheetModalRef = useRef(< BottomSheetModal ></BottomSheetModal>);


    const [date, setDate] = useState(new Date(Date.now()));

    const [leftmonth, setLeftmonth] = useState(0)

    //수정용으로 새로 작성
    const [reatname, setreAtname] = useRecoilState(repname)
    const [reatcategory, setreAtcategory] = useRecoilState(repcategory)
    const [reatexp, setreAtexp] = useRecoilState(repexp)
    const [reatexpDate, setreAtexpDate] = useRecoilState(repexpDate)


    const [name, setName] = useState('')
    const [big, setBig] = useState('')
    const [small, setSmall] = useState('')
    const [dateText, setDateText] = useState('')
    const [expDate, setExpDate] = useState('')


    useEffect(() => {
        console.log(reatname)
        setTimeout(() => {
            setName(reatname)
            setBig(reatcategory.split('/')[0])
            setSmall(reatcategory.split('/')[1])
            setDateText(reatexp)
        }, 100);
    }, [])


    const backAction = () => {
        navigation.goBack()
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);




    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handlePresentModalcancel = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);


    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);


    const [onChangeValue, setOnChangeValue] = React.useState(49)
    useEffect(() => {
        console.log(onChangeValue)
        if (onChangeValue === 0) {
            setLeftmonth(0)
        } else if (onChangeValue <= 9) {
            setLeftmonth(1)
        } else if (onChangeValue <= 17) {
            setLeftmonth(2)
        } else if (onChangeValue <= 25) {
            setLeftmonth(3)
        } else if (onChangeValue <= 34) {
            setLeftmonth(4)
        } else if (onChangeValue <= 41) {
            setLeftmonth(5)
        } else if (onChangeValue <= 49) {
            setLeftmonth(6)
        } else if (onChangeValue <= 57) {
            setLeftmonth(7)
        } else if (onChangeValue <= 64) {
            setLeftmonth(8)
        } else if (onChangeValue <= 73) {
            setLeftmonth(9)
        } else if (onChangeValue <= 80) {
            setLeftmonth(10)
        } else if (onChangeValue <= 88) {
            setLeftmonth(11)
        } else if (onChangeValue <= 96) {
            setLeftmonth(12)
        }

    }, [onChangeValue])

    useEffect(() => {
        setDateText(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
    }, [date])




    function okclick() {
        if (name == '' && big == '' && small == '') {
            Alert.alert('제품명 혹은 종류를 설정해주세요.')
            return
        }

        setreAtname(name)
        setreAtcategory(big + '/' + small)
        setreAtexp(dateText)

        date.setMonth(date.getMonth() - leftmonth)

        setreAtexpDate(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())

        setTimeout(() => {
            navigation.navigate('제품위치수정')
        }, 300);
    }

    const [atdarkmode, setAtdarkmode] = useRecoilState(darkmode); //다크모드

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const citiesDropdownRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setCountries([
                {
                    title: "스킨케어",
                    cities: [{ title: "로션" }, { title: "토너" }, { title: "스킨" }, { title: "미스트" }, { title: "마스크팩" }, { title: "선크림" }]
                },
                {
                    title: "바디케어",
                    cities: [{ title: "바디로션" }, { title: "바디미스트" }],
                },
            ]);
        }, 1000);
    }, []);


    return (
        <NativeBaseProvider>
            <BottomSheetModalProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: atdarkmode === 'light' ? 'rgb(240,240,240)' : 'black' }}>


                    {/* 헤더 시작 */}
                    <View style={{ width: '100%', height: 60, justifyContent: 'center' }}>

                        <View style={{ marginLeft: 20, width: chwidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                            {/* < 시작 */}
                            <TouchableWithoutFeedback onPress={() => { navigation.goBack(); }}>
                                <View style={{ width: 40, height: 40, borderRadius: 25, alignItems: 'center', justifyContent: 'center', }}>
                                    <AutoHeightImage source={back} width={35}></AutoHeightImage>
                                </View>
                            </TouchableWithoutFeedback>
                            {/* < 끝 */}

                            <Text style={{ fontSize: 23, color: atdarkmode === 'light' ? 'black' : 'white', fontWeight: 'bold' }}>수정하기</Text>


                            <View style={{ width: 40, height: 40 }}>

                            </View>

                        </View>

                    </View>
                    {/* 헤더 끝 */}

                    <View style={{ flex: 1 }}>
                        {/* 본문 시작 */}
                        <ScrollView>
                            <View style={{ width: chwidth - 40, borderRadius: 20, marginLeft: 20, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(48,48,48)', elevation: 10, marginTop: 20, marginBottom: 100 }}>
                                <View style={{ width: chwidth - 80, marginLeft: 20, marginTop: 30, marginBottom: 30 }}>
                                    {/*  */}
                                    <Text style={{ fontSize: 18, color: atdarkmode === 'light' ? 'black' : 'white' }}>제품명</Text>
                                    <View style={{ borderWidth: 1, borderColor: atdarkmode === 'light' ? 'rgb(204,204,204)' : 'rgb(48,48,48)', backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)', height: 45, marginTop: 10, borderRadius: 3 }}>
                                        <TextInput onChangeText={(txt) => setName(txt)} value={name} style={{ height: 45, width: chwidth - 100, marginLeft: 10, color: atdarkmode === 'light' ? 'black' : 'white' }} placeholder={'제품명을 입력해주세요.'} placeholderTextColor={atdarkmode === 'light' ? 'black' : 'white'}></TextInput>
                                    </View>
                                    {/*  */}
                                    <Text style={{ fontSize: 18, marginTop: 25, color: atdarkmode === 'light' ? 'black' : 'white' }}>화장품 종류</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                        <SelectDropdown
                                            data={countries}
                                            onSelect={(selectedItem, index) => {
                                                console.log(selectedItem.title, index);
                                                setBig(selectedItem.title);
                                                citiesDropdownRef.current.reset();
                                                setCities([]);
                                                setCities(selectedItem.cities);
                                            }}
                                            defaultButtonText={big}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem.title;
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item.title;
                                            }}
                                            buttonStyle={{
                                                flex: 1,
                                                height: 40,
                                                backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)',
                                                borderRadius: 3,
                                                borderWidth: 1,
                                                borderColor: atdarkmode === 'light' ? 'rgb(204,204,204)' : 'rgb(48,48,48)',
                                            }}
                                            buttonTextStyle={{ textAlign: "left", fontSize: 16, color: atdarkmode === 'light' ? 'black' : 'white' }}
                                            renderDropdownIcon={() => {
                                                if (atdarkmode === 'light') {
                                                    return (
                                                        <AutoHeightImage source={select_arrow} width={15}></AutoHeightImage>
                                                    );

                                                } else {
                                                    return (
                                                        <AutoHeightImage source={d_select_arrow} width={15}></AutoHeightImage>
                                                    );

                                                }
                                            }}
                                            dropdownIconPosition={"right"}
                                            dropdownStyle={{ backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)' }}
                                            rowStyle={{ backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)', borderBottomColor: 'black' }}
                                            rowTextStyle={{ color: atdarkmode === 'light' ? 'black' : 'white', textAlign: 'left' }}
                                        />
                                        <View style={{ width: 12 }} />
                                        <SelectDropdown
                                            ref={citiesDropdownRef}
                                            data={cities}
                                            onSelect={(selectedItem, index) => {
                                                console.log(selectedItem.title, index);
                                                setSmall(selectedItem.title)
                                            }}
                                            defaultButtonText={small}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem.title;
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item.title;
                                            }}
                                            buttonStyle={{
                                                flex: 1,
                                                height: 40,
                                                backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)',
                                                borderRadius: 3,
                                                borderWidth: 1,
                                                borderColor: atdarkmode === 'light' ? 'rgb(204,204,204)' : 'rgb(48,48,48)',
                                            }}
                                            buttonTextStyle={{ textAlign: "left", fontSize: 16, color: atdarkmode === 'light' ? 'black' : 'white' }}
                                            renderDropdownIcon={() => {
                                                if (atdarkmode === 'light') {
                                                    return (
                                                        <AutoHeightImage source={select_arrow} width={15}></AutoHeightImage>
                                                    );
                                                } else {
                                                    return (
                                                        <AutoHeightImage source={d_select_arrow} width={15}></AutoHeightImage>
                                                    );
                                                }
                                            }}
                                            dropdownIconPosition={"right"}
                                            dropdownStyle={{ backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)' }}
                                            rowStyle={{ backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)', borderBottomColor: 'black' }}
                                            rowTextStyle={{ color: atdarkmode === 'light' ? 'black' : 'white', textAlign: 'left' }}
                                        />
                                    </View>

                                    {/*  */}
                                    <Text style={{ fontSize: 18, marginTop: 25, color: atdarkmode === 'light' ? 'black' : 'white' }}>유통기한 설정</Text>

                                    <TouchableWithoutFeedback onPress={() => { handlePresentModalPress() }}>
                                        <View style={{ borderWidth: 1, borderColor: atdarkmode === 'light' ? 'rgb(204,204,204)' : 'rgb(48,48,48)', backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)', height: 40, marginTop: 10, borderRadius: 3, alignItems: 'center', }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', width: chwidth - 100, height: 40, justifyContent: 'space-between', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 15, color: atdarkmode === 'light' ? 'black' : 'white' }}> {dateText} </Text>
                                                <AutoHeightImage source={dateicon} width={18}></AutoHeightImage>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    {/*  */}
                                    <Text style={{ fontSize: 18, marginTop: 25, marginBottom: 20, color: atdarkmode === 'light' ? 'black' : 'white' }}>유통기한 알람</Text>

                                    <Slider
                                        defaultValue={49}
                                        colorScheme="cyan"
                                        onChange={(v) => {
                                            setOnChangeValue(Math.floor(v))
                                        }}>
                                        <Slider.Track bg='gray.100' borderWidth={3} borderColor={'rgb(216,216,216)'}>
                                        </Slider.Track>
                                        <Slider.Thumb bg='rgb(233,31,54)'>
                                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -20 }}>
                                                <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>{leftmonth} </Text>
                                            </View>
                                        </Slider.Thumb>
                                    </Slider>

                                    <View style={{ flexDirection: 'row', width: chwidth - 75, justifyContent: 'space-between' }}>
                                        <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>0개월 전    </Text>
                                        <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>6개월 전 </Text>
                                        <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>12개월 전</Text>
                                    </View>

                                </View>
                            </View>

                        </ScrollView>
                        {/* 본문 끝 */}

                    </View>

                    {/* 하단 버튼 시작 */}
                    <View style={{ width: '100%', height: 90, alignItems: 'center', justifyContent: 'center' }}>
                        {/* 파랑버튼 */}
                        <TouchableWithoutFeedback onPress={() => { okclick() }}>
                            <View style={{ borderRadius: 10, backgroundColor: atdarkmode === 'light' ? 'white' : 'black', borderWidth: 1.5, borderColor: atdarkmode === 'light' ? 'black' : 'white', width: chwidth - 40, height: 60, alignItems: 'center', justifyContent: 'center', elevation: 20, }}>
                                <Text style={{ fontSize: 23, color: atdarkmode === 'light' ? 'black' : 'white', fontWeight: 'bold' }}>확인</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* 하단 버튼 끝 */}
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        handleComponent={() =>
                            <View style={{ height: 30, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(61,61,61)', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                            </View>
                        }>
                        <View style={{ flex: 1, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(61,61,61)' }}>
                            <DatePicker
                                style={{ width: chwidth, flex: 1, }}
                                date={date}
                                onDateChange={(date) => { setDate(date), console.log(date) }}
                                mode={'date'}
                                locale='ko_KR'
                                fadeToColor={atdarkmode === 'light' ? 'white' : 'rgb(61,61,61)'}
                                textColor={atdarkmode === 'light' ? 'black' : 'white'}
                            />
                            <View style={{ justifyContent: 'flex-end' }}>
                                <TouchableWithoutFeedback onPress={() => handlePresentModalcancel()}>
                                    <View style={{ width: chwidth, height: 60, backgroundColor: atdarkmode === 'light' ? 'rgb(9,24,255)' : 'gray', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 18, color: atdarkmode === 'light' ? 'white' : 'white' }}>완료</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </BottomSheetModal>

                </SafeAreaView>

            </BottomSheetModalProvider>

        </NativeBaseProvider>
    )
}


export default ReproductRegist