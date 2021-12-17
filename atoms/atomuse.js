// const [atbase64, setatbase64] = useRecoilState(imagebase64) //베이스64로 묶은 이미지

// const [atid, setAtid] = useRecoilState(pid); //사용자 아이디
//

// const [atname, setAtname] = useRecoilState(pname)   //제품이름
// const [atcategory, setAtcategory] = useRecoilState(pcategory) //제품카테고리
// const [atexp, setAtexp] = useRecoilState(pexp)  //제품 유통기한
// const [atexpDate, setAtexpDate] = useRecoilState(pexpDate) //제품유통기한 알람일
// const [atlocation,setatlocation] = useRecoilState(placation) //위 아래 칸 설정

//const [atlist, setatlist] = useRecoilState(plist) //제품 리스트

// const [atbuyname, setBuyatname] = useRecoilState(buypname) //웹뷰 제품 이름

// const [reatnno, setreAtno] = useRecoilState(repNo) // 수정용 제품 넘버
// const [reatname, setreAtname] = useRecoilState(repname) //수정용 이름
// const [reatcategory, setreAtcategory] = useRecoilState(repcategory) //수정용 카테고리
// const [reatexp, setreAtexp] = useRecoilState(repexp) //수정용 유통기한
// const [reatexpDate, setreAtexpDate] = useRecoilState(repexpDate) //수정용 유통기한 알림 설정일


//  const [atdarkmode, setAtdarkmode] = useRecoilState(darkmode); //다크모드
//
// const [atfloor3rd, setatfloor3rd] = useRecoilState(floor3rd); //3층 설정


// async

// const storeDate = async (value) => {
//     try {
//         await AsyncStorage.setItem('@date_first', value)
//     } catch (e) {
//         console.log(e)
//     }
// }
// const storeData = async (value) => {
//     try {
//         await AsyncStorage.setItem('@user_id', value)
//     } catch (e) {
//         console.log(e)
//     }
// }


// const getData = async () => {
//     try {
//         const value = await AsyncStorage.getItem('@user_id')
//         if (value !== null) {
//             return value
//         } else {
//             return 'first'
//         }
//     } catch (e) {
//         // error reading value
//     }
// }

// const storeData = async (value) => {
//     try {
//         await AsyncStorage.setItem('@dark_mode', value)
//     } catch (e) {
//         console.log(e)
//     }
// }

// const setfloor3rd = async (value) => {
//     try {
//         await AsyncStorage.setItem('@floor3rd', value)
//     } catch (e) {
//         console.log(e)
//     }
// }