/* eslint-disable */
import { Reset } from "styled-reset";
import {
    Container, Wrapper, Input,
    InputInformation, InputName, Inputs,
    Logo, Right, LoginBtn, Wrapper2,
    Title, AddProfileBtn, ProfileName, Profilediv, SaveProfileBtn, Input2, GoSign, Logo2
} from "./style";
import RehappyLogo from "../../images/리해피최종로고.png";
import { useEffect, useState } from "react";
import { ProfileContainer, ProfileImg, ProfileWrapper } from "../SignUp/style";
import { useNavigate } from 'react-router-dom';
import Profile from "../../images/img.png";
import axios from "axios";
import Cookies from "js-cookie";
import Man from "../../images/man.png";
import Woman from "../../images/woman.png";
import GrandF from "../../images/grandfather.png";
import GrandM from "../../images/granmother.png";
import {jwtDecode} from "jwt-decode";
import ThinRehappyLogo from "../../images/리해피로고얇은버전.png";

const profileTypes = [
    { type: 1, image: Profile },
    { type: 2, image: Man },
    { type: 3, image: Woman },
    { type: 4, image: GrandF },
    { type: 5, image: GrandM },
];

const profileImages = {
    1: Profile,
    2: Man,
    3: Woman,
    4: GrandF,
    5: GrandM,
};

export default function Login() {
    const navigate = useNavigate();
    const [isNext, setIsNext] = useState(false);
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [selectedProfileType, setSelectedProfileType] = useState(null);
    const [profileName, setProfileName] = useState("");
    const [isAddingProfile, setIsAddingProfile] = useState(false);
    const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);


    const handleNext = async () => {
        try {
            const response = await axios.post(`/api/users/login`, null, {
                params: {
                    email: userId,
                    password: password,
                },
                withCredentials: true,
            });

            // 서버가 쿠키를 설정하므로 클라이언트에서 별도로 저장할 필요 없음
            if (response.status === 200) {
                alert("로그인 성공!");
                setIsNext(true); // 다음 단계로 이동
            } else {
                throw new Error("토큰이 저정되지 않았습니다.");
            }
        } catch (error) {
            console.error("로그인 실패:", error.response?.data || error.message);
            alert(`로그인에 실패했습니다: ${error.response?.data?.message || "알 수 없는 오류"}`);
        }
    };

    const handleSaveProfile = async () => {
        if (!selectedProfileType || !profileName) {
            alert("프로필 타입과 닉네임을 입력해주세요.");
            return;
        }

        const authToken = Cookies.get("authToken");
        if (!authToken) {
            alert("로그인 후 프로필을 추가해주세요.");
            return;
        }

        // JWT 토큰에서 'name' 추출
        let userName = '';
        try {
            const decodedToken = jwtDecode(authToken);  // 토큰 디코딩
            userName = decodedToken.username;  // 'name'을 추출
        } catch (error) {
            console.error("토큰 디코딩 실패:", error);
            alert("토큰 디코딩 실패. 다시 로그인해주세요.");
            return;
        }

        // 서버로 POST 요청
        try {
            const response = await axios.post(
                `/api/profiles`,
                {
                    profileName: profileName,
                    name: userName,            // 토큰에서 가져온 name
                    email: profileName,             // 사용자 아이디 (이메일로 사용)
                    password: password,        // 사용자 비밀번호
                    profilePictureType: selectedProfileType, // 선택된 프로필 타입
                },
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log("프로필 저장 성공:", response.data);
            alert("프로필이 저장되었습니다.");

            await handleFetchProfiles(); // 최신 프로필 목록 가져오기
            setIsAddingProfile(false); // 프로필 추가 모드 종료
        } catch (error) {
            console.error("프로필 저장 실패:", error.response?.data || error.message);
            alert(`프로필 저장에 실패했습니다: ${error.response?.data?.message || "알 수 없는 오류"}`);
        }
    };

    const handleFetchProfiles = async () => {
        const authToken = Cookies.get("authToken");
        if (!authToken) return;

        setIsLoadingProfiles(true);
        try {
            const response = await axios.get(`/api/profiles/parent/users`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
                withCredentials: true,
            });
            setProfiles(response.data);
        } catch (error) {
            console.error("프로필 가져오기 실패:", error.response?.data || error.message);
            alert(`프로필 정보를 가져오는 데 실패했습니다.`);
        } finally {
            setIsLoadingProfiles(false);
        }
    };

    const handleAddProfile = () => {
        setIsAddingProfile(true);
    };

    const handleProfileClick = async (profileId) => {
        try {
            // 프로필 선택 API 요청
            const response = await axios.post(
                `/api/profiles/select?profileId=${profileId}`,
                {},
                {
                    headers: {
                        'Accept': '*/*',
                    },
                    withCredentials: true, // 쿠키 동기화
                }
            );

            alert("프로필 선택이 완료되었습니다!");
            navigate("/"); // 프로필 선택 후 메인 페이지로 이동
        } catch (error) {
            console.error("프로필 선택 실패:", error.response?.data || error.message);
            alert(`프로필 선택에 실패했습니다: ${error.response?.data?.message || "알 수 없는 오류"}`);
        }
    };


    useEffect(() => {
        if (isNext) {
            handleFetchProfiles();
        }
    }, [isNext]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleNext();
        }
    };

    return (
        <>
            <Reset />
            <Wrapper>
                {isNext ? (
                    <Wrapper2>
                        {isAddingProfile ? (
                            <div style={{height:'80%', width:'90%'}}>
                                <Title>프로필 선택 후 닉네임을 입력하세요</Title>
                                <ProfileContainer>
                                    {profileTypes.map((profile) => (
                                        <ProfileWrapper
                                            key={profile.type}
                                            isSelected={selectedProfileType === profile.type}
                                            onClick={() => setSelectedProfileType(profile.type)}
                                        >
                                            <ProfileImg src={profile.image} />
                                        </ProfileWrapper>
                                    ))}
                                </ProfileContainer>
                                {selectedProfileType && (
                                    <div>
                                        <InputName>닉네임</InputName>
                                        <div style={{display:'flex', width:'100%',  justifyContent:'space-between', alignItems:'center'}}>
                                            <Input2
                                                value={profileName}
                                                onChange={(e) => setProfileName(e.target.value)}
                                                placeholder="닉네임을 입력하세요"
                                            />
                                            <SaveProfileBtn onClick={handleSaveProfile}>저장</SaveProfileBtn>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                {isLoadingProfiles ? (
                                    <p>프로필을 불러오는 중입니다...</p>
                                ) : (
                                    <>
                                        <Title>기록할 프로필을 선택해 주세요</Title>
                                        <div style={{ display: 'flex', width: 'auto', justifyContent: 'space-around'}}>
                                            {profiles.map((profile) => (
                                                <Profilediv key={profile.id}>
                                                    <ProfileWrapper onClick={() => handleProfileClick(profile.id)}>
                                                        <ProfileImg src={profileImages[profile.profilePictureType]} />
                                                    </ProfileWrapper>
                                                    <ProfileName>{profile.name}</ProfileName>
                                                </Profilediv>
                                            ))}
                                        </div>
                                    </>
                                )}
                                <AddProfileBtn onClick={handleAddProfile}>프로필 추가하기</AddProfileBtn>
                            </>
                        )}
                    </Wrapper2>
                ) : (
                    <Container>
                        <Right>
                            <Logo src={RehappyLogo} />
                            <Logo2 src={ThinRehappyLogo} />
                        </Right>
                        <InputInformation>
                            <Inputs>
                                <InputName>아이디</InputName>
                                <Input
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                            </Inputs>
                            <Inputs>
                                <InputName>비밀번호</InputName>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                            </Inputs>
                            <LoginBtn onClick={handleNext}>로그인</LoginBtn>
                            <GoSign>회원이 아니세요?
                                <a onClick={() =>navigate('/signup')}>회원가입하러가기</a></GoSign>
                        </InputInformation>
                    </Container>
                )}
            </Wrapper>
        </>
    );
}
