import {
    Add,
    AddButton, AddMenu,
    AddWrapper,
    Down,
    DownButton,
    Logo,
    LogoWrapper,
    Menu,
    MenuWrapper,
    Wrapper,
    XButton
} from "./style";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

export default function MenuRecommend() {

    const navigate = useNavigate();
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
    const onClickDown = () => {
        navigate('/recommend');
    }

    return (
        <>
            <Wrapper>
                <LogoWrapper>
                    <Logo src='/images/logo.png' alt='로고'></Logo>
                </LogoWrapper>
                <MenuWrapper>
                    {menuList.map((menu, index) => (
                        <div key={index} style={{ position: 'relative', marginBottom: '10px' }}>
                            <Menu>{menu}</Menu>
                            <XButton onClick={() => onClickRemoveItem(index)}>X</XButton>
                        </div>
                    ))}
                </MenuWrapper>
                <AddWrapper>
                    <LogoWrapper>
                        <Add src='/images/add.png' alt='add'></Add>
                        <AddButton onClick={onClickAddButton}>+</AddButton>
                    </LogoWrapper>
                    <AddMenu
                        value={inputValue}
                        onChange={(event) => onChangeInputValue(event.target.value)}
                        placeholder="Add menu item"
                    />
                </AddWrapper>
                <DownButton onClick={onClickDown}>
                    <Down src='/images/downButton.png' alt='down' />
                </DownButton>
            </Wrapper>
        </>
    );
}
