import {
    atom,
} from 'recoil';

export const darkmode = atom({
    key: 'darkmode',
    default: 'light',
});

export const imagebase64 = atom({
    key: 'imagebase64',
    default: '',
});

export const pid = atom({
    key: 'pid',
    default: '',
});

export const pname = atom({
    key: 'pname',
    default: '',
});


export const pcategory = atom({
    key: 'pcategory',
    default: '',
});

export const pexp = atom({
    key: 'pexp',
    default: '',
});

export const pexpDate = atom({
    key: 'pexpDate',
    default: '',
});

export const placation = atom({ // u / d
    key: 'placation',
    default: '',
});

////////////////////////////////

export const repNo = atom({
    key: 'repNo',
    default: '',
});

export const repname = atom({
    key: 'repname',
    default: '',
});


export const repcategory = atom({
    key: 'repcategory',
    default: '',
});

export const repexp = atom({
    key: 'repexp',
    default: '',
});

export const repexpDate = atom({
    key: 'repexpDate',
    default: '',
});

export const replacation = atom({ // u / d
    key: 'replacation',
    default: '',
});

////////////////////////////////////

export const isdark = atom({ //다크모드 용
    key: 'isdark',
    default: 'no',
});

export const plist = atom({ //메인용 제품 리스트
    key: 'plist',
    default: [],
});

export const buypname = atom({ //웹뷰용 제품 이름
    key: 'buypname',
    default: '',
});

export const floor3rd = atom({ //웹뷰용 제품 이름
    key: 'floor3rd',
    default: 'off',
});