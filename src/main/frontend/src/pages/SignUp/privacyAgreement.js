import React, { useState } from "react";
import {Container, Wrapper} from "./style";
import {useNavigate} from "react-router-dom";

function PrivacyAgreement() {
    const navigate = useNavigate();
    const [isAgreed, setIsAgreed] = useState(false); // 동의 여부 상태

    const handleAgreeChange = (e) => {
        setIsAgreed(e.target.checked); // 체크박스 상태 업데이트
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAgreed) {
            alert("회원가입이 완료되었습니다.");
            navigate('/login')
        } else {
            alert("약관에 동의해야만 진행할 수 있습니다.");
        }
    };

    return (
        <>
            <Wrapper>
                <Container style={{
                    flexDirection: 'column',
                    padding: '50px',
                    width: '700px',
                }}>
                    <h1>개인정보 수집 및 이용 동의</h1>
                    <div
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            height: "200px",
                            overflowY: "scroll",
                            marginBottom: "10px",
                        }}
                    >
                        {/* 약관 내용 */}
                        <h3>1. 개인정보의 수집 및 이용 목적</h3>
                        <p>
                            본 서비스는 아래의 목적을 위해 사용자의 개인정보를 수집하고
                            이용합니다:
                        </p>
                        <ul>
                            <li>서비스 이용 시 통증 보고서 및 위치 기반 서비스 제공</li>
                            <li>사용자 위치를 기반으로 병원 추천</li>
                            <li>통증 보고서 생성 및 통증 진단 항목의 정교화를 위한 데이터 분석</li>
                            <li>
                                수집된 데이터는 비식별화 처리 후 안전하게 암호화되어 보관됩니다.
                            </li>
                        </ul>
                        <h3>2. 수집하는 개인정보 항목</h3>
                        <p>
                            이름, 연락처, 위치 정보, 통증 기록 데이터, 기타 서비스 이용
                            기록.
                        </p>
                        <h3>3. 개인정보 보관 및 파기</h3>
                        <p>
                            사용자의 개인정보는 서비스 이용 기간 동안 보관됩니다. 서비스
                            종료 또는 사용자 요청 시 개인정보는 즉시 파기됩니다.
                        </p>
                        <h3>4. 개인정보 보호 조치</h3>
                        <p>
                            개인정보는 암호화 기술을 통해 안전하게 관리되며, 사용자의
                            정보는 비식별화 처리되어 제3자에게 제공되지 않습니다.
                        </p>
                    </div>

                    {/* 동의 체크박스 */}
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input
                                type="checkbox"
                                checked={isAgreed}
                                onChange={handleAgreeChange}
                            />
                            약관을 읽었으며 동의합니다.
                        </label>
                        <br />
                        <button
                            type="submit"
                            style={{
                                marginTop: "30px",
                                padding: "10px 20px",
                                backgroundColor: isAgreed ? "#FFAE00" : "#ccc",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: isAgreed ? "pointer" : "not-allowed",
                            }}
                            disabled={!isAgreed} // 동의하지 않으면 버튼 비활성화
                        >
                            동의합니다
                        </button>
                    </form>
                </Container>
            </Wrapper>
        </>

    );
}

export default PrivacyAgreement;
