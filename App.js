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

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import barcodeCheck from './src/barcodeCheck';
import pictureTake from './src/pictureTake';
import testMain from './src/testMain';
import PictureCheck from './src/pictureCheck';
import ScrollMain from './src/scrollMain';
import Weather from './src/weather';
import WbBuy from './src/wbBuy';
import Reservation from './src/reservation';
import Productregist from './src/productregist';
import ProductAddr from './src/productAddr';
import Realmain from './src/realmain';
import Login from './register/login';
import Register from './register/register';
import Buyproduct from './wb/buyproduct';
import ReproductRegist from './resu/reproductRegist';
import ReProductAddr from './resu/reproductaddr';
import Load from './register/load';
import ReviewWb from './wb/reviewWb';
import SettingPage from './src/settingPage';
import PwdChangePage from './src/pwdChangePage';
import insideView from './src/insideView';

const Stack = createStackNavigator();


export default APP = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="로딩" component={Load} />

          <Stack.Screen name="로그인" component={Login} />

          <Stack.Screen name="바코드체크" component={barcodeCheck} />
          <Stack.Screen name="제품등록" component={Productregist} />
          <Stack.Screen name="제품위치" component={ProductAddr} />
          <Stack.Screen name="실제 메인" component={Realmain} />
          <Stack.Screen name="회원가입" component={Register} />
          <Stack.Screen name="사진촬영" component={pictureTake} />

          <Stack.Screen name="웹뷰" component={Buyproduct} />
          <Stack.Screen name="리뷰웹뷰" component={ReviewWb} />


          <Stack.Screen name="제품수정" component={ReproductRegist} />
          <Stack.Screen name="제품위치수정" component={ReProductAddr} />

          <Stack.Screen name="설정" component={SettingPage} />
          <Stack.Screen name="비밀번호수정" component={PwdChangePage} />
          <Stack.Screen name="내부사진보기" component={insideView} />


          <Stack.Screen name="사진보기" component={PictureCheck} />
          <Stack.Screen name="스크롤메인" component={ScrollMain} />
          <Stack.Screen name="날씨테스트" component={Weather} />
          <Stack.Screen name="구매테스트" component={WbBuy} />
          <Stack.Screen name="예약 알림 테스트" component={Reservation} />

        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}


