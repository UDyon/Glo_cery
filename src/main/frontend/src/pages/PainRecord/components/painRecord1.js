/* eslint-disable */
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

    @media (max-width: 768px) {
        flex-direction: column;
    }
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

const ChangeDateContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ChangeDateButton = styled.button`
    font-size: 15px;
    padding: 10px 10px;
    color: #110078;
    background-color: #D7E8FF;
    border: 3px solid #110078;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        color: white;
        background-color: #110078;
    }
`;

const DateInput = styled.input`
    margin-left: 20px;
    padding: 10px;
    font-size: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const InstructionText = styled.p`
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 5px;
`;

const InstructionText2 = styled.p`
    font-size: 25px;
    font-weight: bold;
    margin-top: 40px;
    margin-bottom: 20px;
    color: #555;
`;

const TimeWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`;

const PeriodButton = styled.button`
    font-size: 25px;
    padding: 10px 20px;
    margin-right: 20px;
    border-radius: 20px;
    border: none;
    background-color: ${(props) => (props.isAm ? "#FFAE00" : "#110078")};
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: ${(props) => (props.isAm ? "#110078" : "#FFAE00")};
    }
`;

const InstructionText3 = styled.p`
    font-size: 25px;
    font-weight: bold;
    margin-right: 15px;
    color: #555;
`;

const TimeInputContainer = styled.div`
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
`;

const TimeSelect = styled.select`
    font-size: 25px;
    padding: 15px;
    margin-right: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    text-align: center;
`;

const DurationInput = styled.input`
    font-size: 25px;
    padding: 10px;
    margin-left: 2px;
    width: 100%;
    max-width: 150px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #ccc;
`;

const ErrorText = styled.p`
    font-size: 25px;
    color: red;
    margin-top: 5px;
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

const SelectedButton = styled.button`
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${(props) => (props.selected ? "#110078" : "#D7E8FF")};
    color: ${(props) => (props.selected ? "white" : "#110078")};
    border: 2px solid #110078;
    font-size: 16px;

    &:hover {
        background-color: ${(props) => (props.selected ? "#110078" : "#A0CFFF")};
    }
`;

const SelectedPartsContainer = styled.div`
    margin-left: 1px;
    font-size: 25px;
    color: ${(props) => (props.isEmpty ? "#FFAE00" : "#110078")};
`;

export default function PainRecord1({ onNext, selectedParts, subPartOptions, onSubPartSelect }) {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const formattedDate = `${selectedDate.getFullYear()}/${String(
        selectedDate.getMonth() + 1
    ).padStart(2, "0")}/${String(selectedDate.getDate()).padStart(2, "0")} (${days[selectedDate.getDay()]})`;

    const today = new Date().toISOString().split("T")[0];

    const [period, setPeriod] = useState(selectedDate.getHours() < 12 ? "AM" : "PM");
    const [hour, setHour] = useState(String((selectedDate.getHours() % 12) || 12).padStart(2, "0"));
    const [minute, setMinute] = useState(
        String(Math.floor(selectedDate.getMinutes() / 10) * 10).padStart(2, "0")
    );
    const [duration, setDuration] = useState(""); // 통증 지속 시간
    // eslint-disable-next-line
    const [error, setError] = useState(""); // 에러 메시지 상태

    const handleDateChange = (event) => {
        setSelectedDate(new Date(event.target.value));
    };

    const handlePeriodToggle = () => {
        setPeriod((prev) => (prev === "AM" ? "PM" : "AM"));
    };

    const handleNextClick = () => {
        if (selectedParts.length === 0) {
            alert("통증 발생 부위를 선택해 주세요.");
            return;
        }
        if (hour === "" || minute === "") {
            alert("통증 발생 시간을 모두 선택해 주세요.");
            return;
        }

        const formattedDate = selectedDate.toISOString().split("T")[0];
        const formattedTime = `${hour}:${minute}`;
        onNext(formattedDate, formattedTime, parseInt(duration, 10)); // 정수로 변환 후 전달
    };

    return (
        <Container>
            <DateWrapper>
                <DateText>{formattedDate}</DateText>
                <ChangeDateContainer>
                    <ChangeDateButton onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
                        날짜 변경
                    </ChangeDateButton>
                    {isDatePickerOpen && (
                        <DateInput
                            type="date"
                            value={selectedDate.toISOString().split("T")[0]}
                            onChange={handleDateChange}
                            max={today}
                        />
                    )}
                </ChangeDateContainer>
            </DateWrapper>
            <InstructionText>통증 부위 및 시간을 선택해 주세요.</InstructionText>
            <InstructionText2>통증 부위</InstructionText2>
            <SelectedPartsContainer isEmpty={selectedParts.length === 0}>
                {selectedParts.length === 0
                    ? "통증 부위를 선택하세요"
                    : `${selectedParts.join(", ")}`}
                {subPartOptions && (
                    <div>
                        {subPartOptions && (
                            <div>
                                <h3>세부 부위를 선택하세요:</h3>
                                {subPartOptions.map((option) => (
                                    <SelectedButton
                                        key={option}
                                        onClick={() => onSubPartSelect(option)}
                                        selected={selectedParts.includes(option)} // 선택 여부에 따라 색상 변경
                                    >
                                        {option}
                                    </SelectedButton>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </SelectedPartsContainer>
            <TimeInputContainer>
                <label htmlFor="pain-time">
                    <InstructionText2>통증 발생 시간</InstructionText2>
                </label>
                <div>
                    <TimeWrapper>
                        <PeriodButton isAm={period === "AM"} onClick={handlePeriodToggle}>
                            {period === "AM" ? "오전" : "오후"}
                        </PeriodButton>
                        <TimeSelect
                            id="pain-hour"
                            value={hour}
                            onChange={(e) => setHour(e.target.value)}
                        >
                            <option value="">시</option>
                            {Array.from({length: 12}, (_, i) => (
                                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                    {String(i + 1).padStart(2, "0")}
                                </option>
                            ))}
                        </TimeSelect>
                        <InstructionText3>:</InstructionText3>
                        <TimeSelect
                            id="pain-minute"
                            value={minute}
                            onChange={(e) => setMinute(e.target.value)}
                        >
                            <option value="">분</option>
                            {Array.from({length: 6}, (_, i) => (
                                <option key={i} value={String(i * 10).padStart(2, "0")}>
                                    {String(i * 10).padStart(2, "0")}
                                </option>
                            ))}
                        </TimeSelect>
                    </TimeWrapper>
                    <label htmlFor="pain-duration">
                        <InstructionText2>통증 지속 시간 (단위: 분)</InstructionText2>
                    </label>
                    <DurationInput
                        type="number"
                        min="1"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="예: 30"
                    />
                    {error && <ErrorText>{error}</ErrorText>}
                </div>
            </TimeInputContainer>
            <NextButton onClick={handleNextClick}>다음</NextButton>
        </Container>
    );
}
