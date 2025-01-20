import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
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
    margin-right: 15px;
    margin-top: 20px;
    margin-bottom: 40px;
    color: #555;

    @media (max-width: 768px) {
        font-size: 25px;
    }
`;


const InputField = styled.textarea`
    width: 100%;
    height: 80px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
`;

const SubmitButton = styled.button`
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
`;

export default function PainRecord4({ onSubmit, selectedDate }) {
    const [aggravatingFactors, setAggravatingFactors] = useState("");
    const [relievingFactors, setRelievingFactors] = useState("");
    const [treatmentResponse, setTreatmentResponse] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = () => {
        onSubmit({
            aggravatingFactors,
            relievingFactors,
            treatmentResponse,
            notes,
        }); // 최종 데이터 제출
    };

    const formatSelectedDate = (date) => {
        if (!date) return "날짜가 선택되지 않았습니다.";
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const d = new Date(date);
        return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(
            d.getDate()
        ).padStart(2, "0")} (${days[d.getDay()]})`;
    };

    const formattedDate = formatSelectedDate(selectedDate);

    return (
        <Container>
            <DateWrapper>
                <DateText>{formattedDate}</DateText>
            </DateWrapper>
            <Title>통증 추가 정보를 입력해 주세요 (생략 가능)</Title>
            <InputField
                placeholder="악화 요인 (예: 운동)"
                value={aggravatingFactors}
                onChange={(e) => setAggravatingFactors(e.target.value)}
            />
            <InputField
                placeholder="완화 요인 (예: 휴식)"
                value={relievingFactors}
                onChange={(e) => setRelievingFactors(e.target.value)}
            />
            <InputField
                placeholder="통증 치료 반응 (예: 진통제로 호전)"
                value={treatmentResponse}
                onChange={(e) => setTreatmentResponse(e.target.value)}
            />
            <InputField
                placeholder="추가 메모"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
        </Container>
    );
}
