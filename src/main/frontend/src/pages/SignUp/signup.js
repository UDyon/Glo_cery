import { Reset } from "styled-reset";
import {
    Wrapper, Container, InputInformation, Input,
    Inputs, InputName, Right, Logo, SignupBtn, Logo2,
} from './style';
import RehappyLogo from '../../images/리해피최종로고.png';
import ThinRehappyLogo from '../../images/리해피로고얇은버전.png';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";


export default function Signup() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name); // 사용자 이름
            formData.append("email", username); // 아이디 -> 이메일
            formData.append("password", password);


            // 쿼리 파라미터와 함께 POST 요청 전송
            const response = await axios.post('/api/users/register', formData, {
                headers: {
                    'Content-Type': ' application/json',
                },
                params: {
                    isDoctor: false,
                },
            });

            console.log("회원가입 성공:", response.data);
            navigate('/privacyAgreement')
        } catch (error) {
            console.error("회원가입 오류:", error.response?.data || error.message);
            alert(`회원가입에 실패했습니다: ${error.response?.data?.message || "알 수 없는 오류"}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <>
            <Reset />
            <Wrapper>
                <Container>
                    <Logo2 src={ThinRehappyLogo} />
                    <InputInformation>
                        <Inputs>
                            <InputName>이름</InputName>
                            <Input value={name} onChange={(e) => setName(e.target.value)}                                     onKeyPress={handleKeyPress}/>
                        </Inputs>
                        <Inputs>
                            <InputName>아이디</InputName>
                            <Input value={username} onChange={(e) => setUsername(e.target.value)}                                     onKeyPress={handleKeyPress}/>
                        </Inputs>
                        <Inputs>
                            <InputName>비밀번호</InputName>
                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}                                     onKeyPress={handleKeyPress}/>
                        </Inputs>
                        <Inputs>
                            <InputName>비밀번호 확인</InputName>
                            <Input type="password"
                                   value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                   onKeyPress={handleKeyPress}
                            />
                        </Inputs>
                    </InputInformation>
                    <Right>
                        <Logo src={RehappyLogo} />
                        <SignupBtn onClick={handleSubmit}>완료</SignupBtn>
                    </Right>
                </Container>
            </Wrapper>
        </>
    );
}
