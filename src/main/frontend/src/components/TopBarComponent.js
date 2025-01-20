import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import Profile from "../images/img.png";
import Man from "../images/man.png";
import Woman from "../images/woman.png";
import GrandF from "../images/grandfather.png";
import GrandM from "../images/granmother.png";
import Rehappy from '../images/리해피로고얇은버전.png'

const profileTypes = {
    1: Profile,
    2: Man,
    3: Woman,
    4: GrandF,
    5: GrandM,
};

// Styled Components
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 90%;
    max-width: 1500px;
    height: 100px;

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
    }
`;

const LogoWrapper = styled.div`
    width: 250px;
    height: 90px;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        width: 150px;
        margin-left: 0;
        margin-bottom: 15px;
    }
`;

const Logo = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
    cursor: pointer;
`;

const MenuContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    margin-left: 20%;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
        align-items: center;
    }
`;

const MenuItem = styled.button`
    background: transparent;
    border: none;
    font-weight: bolder;
    font-size: 17px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const ImgWrapper = styled.div`
    width: 50px;
    height: 50px;
    background-color: #FFF1A9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 30px;
        height: 30px;
    }
`;

const MyPageImage = styled.img`
    width: 35px;
    height: 35px;
    transition: background-color 0.3s ease;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`;

const LogoutText = styled.div`
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    
    @media (max-width: 768px) {
        font-size: 10px;
    }
`;

const ProfileWrapper = styled.div`
    position: relative;
    display: inline-block;

    &:hover ${ImgWrapper} {
        background-color: black;
    }

    &:hover ${LogoutText} {
        display: flex;
    }
`;

const LoginButton = styled.button`
    background-color: #110078;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    padding: 8px 16px;
    cursor: pointer;

    @media (max-width: 300px) {
        width: 100%;
        font-size: 10px;
    }
`;

// Main Component
export default function TopBarComponent({ fontColor }) {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const authToken = Cookies.get("authToken");
        if (authToken) {
            try {
                const decoded = jwtDecode(authToken);
                const profileType = decoded.profileType;
                setProfileImage(profileTypes[profileType] || Profile);
                setIsLoggedIn(true);
            } catch (error) {
                console.error("JWT 디코딩 오류:", error);
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('authToken');
        setIsLoggedIn(false);
        alert('로그아웃 되었습니다.');
    };

    return (
        <Container>
            <TopBar>
                <LogoWrapper>
                    <Logo src={Rehappy} onClick={() => navigate('/')} />
                </LogoWrapper>

                <MenuContainer style={{ color: fontColor }}>
                    <MenuItem style={{ color: fontColor }} onClick={() => navigate('/community')}>
                        커뮤니티
                    </MenuItem>

                    <MenuItem style={{ color: fontColor }} onClick={() => navigate('/findHospital')}>
                        주변 병원 탐색하기
                    </MenuItem>

                    <MenuItem style={{ color: fontColor }} onClick={() => navigate('/list')}>
                        내 통증 관리
                    </MenuItem>

                    {isLoggedIn ? (
                        <ProfileWrapper onClick={handleLogout}>
                            <ImgWrapper>
                                <MyPageImage src={profileImage} alt="My Profile" />
                            </ImgWrapper>
                            <LogoutText>로그아웃</LogoutText>
                        </ProfileWrapper>
                    ) : (
                        <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>
                    )}
                </MenuContainer>
            </TopBar>
        </Container>
    );
}
