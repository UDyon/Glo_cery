import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const DateWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const DateText = styled.h2`
    font-size: 40px;
    font-weight: bold;
    color: #333;
    margin-right: 20px;

    @media (max-width: 768px) {
        font-size: 30px;
        margin-bottom: 20px;
    }
`;

const Title = styled.h2`
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        font-size: 25px;
    }
`;

const Grid = styled.div`
    display: grid;
    margin-left: 10px;
    grid-template-columns: repeat(2, 1fr); /* 두 열로 구성 */
    gap: 20px; /* 항목 간 간격 */
    max-width: 1500px;

    @media (max-width: 768px) {
        margin-bottom: 100px;
    }
`;

const Option = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const Checkbox = styled.input`
    margin-right: 30px;
    transform: scale(2); /* 체크박스 크기 조정 */

    @media (max-width: 768px) {
        margin-right: 20px;
        transform: scale(2);
    }
`;

const OtherInput = styled.input`
    margin-left: 10px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 300px;
`;

const NextButton = styled.button`
    position: fixed; 
    bottom: 20px; 
    right: 20px; 
    padding: 10px 20px;
    font-size: 20px;
    font-weight: bold;
    color: #110078;
    background-color: #D7E8FF;
    border: 3px solid #110078;
    border-radius: 20px;
    cursor: pointer;
    z-index: 1000;

    &:hover {
        color: white;
        background-color: #110078;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        position: absolute;
    }
`;

export default function PainRecord2({ onNext, selectedPainTypes, setSelectedPainTypes, selectedDate }) {
    const painOptions = [
        "욱신거리는",
        "콕콕 쑤시는",
        "찌르듯이 아픈",
        "날카로운 양상의",
        "뒤틀리듯이 아픈",
        "갉아먹듯이 아픈",
        "화끈거리는",
        "아리는",
        "뻐근한",
        "누르면 아픈",
        "쪼개지듯 아픈",
        "기타",
    ];

    const [otherPain, setOtherPain] = useState("");

    // 날짜를 yyyy/mm/dd(요일) 형식으로 변환하는 함수
    const formatSelectedDate = (date) => {
        if (!date) return "날짜가 선택되지 않았습니다.";
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const d = new Date(date);
        return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(
            d.getDate()
        ).padStart(2, "0")} (${days[d.getDay()]})`;
    };

    const formattedDate = formatSelectedDate(selectedDate);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (value === "기타" && !checked) {
            setOtherPain(""); // "기타" 선택 해제 시 입력 필드 초기화
            setSelectedPainTypes((prev) => prev.filter((item) => item !== "기타")); // "기타" 항목 제거
        } else if (value === "기타" && checked) {
            setSelectedPainTypes((prev) => [...prev, "기타"]);
        } else {
            setSelectedPainTypes((prev) =>
                checked ? [...prev, value] : prev.filter((item) => item !== value)
            );
        }
    };

    const handleOtherPainBlur = () => {
        if (otherPain.trim()) {
            // 기타에 입력된 값만 저장
            setSelectedPainTypes((prev) =>
                prev.includes("기타") ? [...prev.filter((item) => item !== "기타"), otherPain.trim()] : prev
            );
        }
    };

    return (
        <Container>
            <DateWrapper>
                <DateText>{formattedDate}</DateText>
            </DateWrapper>
            <Title>다음 중 해당되는 통증 양상을 선택해 주세요.</Title>
            <Grid>
                {painOptions.map((option, index) => (
                    <Option key={index}>
                        <Checkbox
                            type="checkbox"
                            value={option}
                            checked={selectedPainTypes.includes(option)}
                            onChange={handleCheckboxChange}
                        />
                        {option}
                        {option === "기타" && selectedPainTypes.includes("기타") && (
                            <OtherInput
                                type="text"
                                placeholder="기타 통증 양상 입력"
                                value={otherPain}
                                onChange={(e) => setOtherPain(e.target.value)}
                                onBlur={handleOtherPainBlur} // 입력창을 벗어나면 저장
                            />
                        )}
                    </Option>
                ))}
            </Grid>
            <NextButton onClick={onNext} disabled={selectedPainTypes.length === 0}>
                다음
            </NextButton>
        </Container>
    );
}
