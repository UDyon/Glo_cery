
import { useState } from "react";
import {
    Wrapper,
    Add,
    AddButton,
    AddMenu,
    AddWrapper, Down, DownButton,
    Logo,
    LogoWrapper,
    Menu,
    MenuWrapper,
    XButton, MyFont
} from "../MenuRecommend/style";


export default function Recommend() {

    const [inputValue, setInputValue] = useState(''); // 입력 값 상태
    const [menuList, setMenuList] = useState([]); // 메뉴 리스트 상태

    // 입력 값 변경 핸들러
    const onChangeInputValue = (value) => {
        setInputValue(value);
    };

    // 리스트 추가 버튼 핸들러
    const onClickAddButton = () => {
        if (inputValue.trim() !== '') {
            setMenuList([...menuList, inputValue]); // 기존 리스트에 새 값 추가
            setInputValue(''); // 입력창 초기화
        }
    };

    // 리스트에서 항목 제거 핸들러
    const onClickRemoveItem = (index) => {
        const newList = menuList.filter((_, i) => i !== index); // 선택된 항목 제거
        setMenuList(newList);
    };

    return (
        <>
            <Wrapper>
                <DownButton>
                    <Down src='/images/upButton.png' alt='up' />
                </DownButton>
                <LogoWrapper>
                    <Logo src='/images/logo.png' alt='로고'></Logo>
                </LogoWrapper>
                <MenuWrapper style={{padding: '10px 20px'}}>
                    <MyFont>샐러드</MyFont>
                    <MyFont>에그인헬</MyFont>
                    <MyFont>샌드위치</MyFont>

                </MenuWrapper>
                <AddWrapper>
                    <LogoWrapper>
                    </LogoWrapper>
                    <div style={{padding: '10px 20px'}}>
                        <MyFont>Total:  Yum!</MyFont>
                    </div>
                </AddWrapper>

            </Wrapper>
        </>
    );
}
