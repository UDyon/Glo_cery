/* eslint-disable */

import React, { useState } from "react";
import PainRecord1 from "./components/painRecord1";
import PainRecord2 from "./components/painRecord2";
import PainRecord3 from "./components/painRecord3";
import BodyDiagram from "../Test/BodyDiagram";
import {
    Wrapper,
    Container,
    LeftSection,
    RightSection,
    BodyDiagramContainer,
} from "./style";
import { Reset } from "styled-reset";
import TopBarComponent from "../../components/TopBarComponent";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import PainRecord4 from "./components/painRecord4";

export default function PainRecord() {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedParts, setSelectedParts] = useState([]);
    const [selectedPainTypes, setSelectedPainTypes] = useState([]);
    const [intensity, setIntensity] = useState(0);
    const [duration, setDuration] = useState(0);
    const [additionalInfo, setAdditionalInfo] = useState({
        aggravatingFactors: "",
        relievingFactors: "",
        treatmentResponse: "",
        notes: "",
    });
    const [subPartOptions, setSubPartOptions] = useState(null); // 추가 선택 부위 옵션
    const jwtToken = Cookies.get("authToken");


    const bodyPartMapping = {
        "head": "머리",
        "neck": "목",
        "upper-abdomen": "윗배/등허리",
        "torso": "아랫배/골반",
        "left-hand": "왼손",
        "left-wrist": "왼쪽 손목/왼쪽 전완(팔뚝)",
        "left-elbow": "왼쪽 팔꿈치/왼쪽 상완",
        "left-shoulder": "왼쪽 어깨",
        "left-chest": "왼쪽 가슴/왼쪽 등",
        "left-thigh": "왼쪽 허벅지",
        "left-knee": "왼쪽 무릎",
        "left-ankle": "왼쪽 종아리/왼발목",
        "left-foot": "왼발",
        "right-hand": "오른손",
        "right-wrist": "오른쪽 손목/오른쪽 전완(팔뚝)",
        "right-elbow": "오른쪽 팔꿈치/오른쪽 상완",
        "right-shoulder": "오른쪽 어깨",
        "right-chest": "오른쪽 가슴/오른쪽 등",
        "right-thigh": "오른쪽 허벅지",
        "right-knee": "오른쪽 무릎",
        "right-ankle": "오른쪽 종아리/오른발목",
        "right-foot": "오른발",
    };

    const handleBodyPartSelection = (parts) => {
        if (step === 1) {
            const translatedParts = parts.map((part) => bodyPartMapping[part] || part);

            const hasMultipleOptions = translatedParts.find((part) => part.includes("/"));
            if (hasMultipleOptions) {
                const options = hasMultipleOptions.split("/");
                setSubPartOptions(options);
            } else {
                setSelectedParts(translatedParts);
            }
        }
    };

    const handleSubPartSelection = (option) => {
        setSelectedParts((prev) => [...prev, option]);
        setSubPartOptions(null);
    };

    const handleDateTimeSelection = (date, time, duration) => {
        setSelectedDate(date);
        setSelectedTime(time);
        setDuration(parseInt(duration, 10)); // duration을 정수로 변환하여 저장
    };

    const handleNextStep = () => setStep((prev) => prev + 1);

    const navigate = useNavigate();

    const handleIntensitySelection = (intensity) => {
        setIntensity(intensity);
        handleNextStep();
    };

    const handleAdditionalInfoSubmit = (info) => {
        handleSubmit(intensity, info); // 최종 제출
    }

    const handleSubmit = async (updatedIntensity, info) => {
        const payload = {
            painDate: selectedDate,
            painTime: selectedTime,
            intensity: updatedIntensity,
            duration: duration,
            location: selectedParts.join(", "),
            pattern: selectedPainTypes.join(", "),
            aggravatingFactors: info.aggravatingFactors,
            relievingFactors: info.relievingFactors,
            treatmentResponse: info.treatmentResponse,
            notes: info.notes,
        };

        console.log("전송할 데이터:", payload);

        try {
            const response = await fetch(`/api/pains`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("통증 기록이 성공적으로 저장되었습니다.");
                navigate("/list"); // 데이터 저장 후 페이지 이동
            } else {
                const errorData = await response.json();
                console.error("응답 에러:", errorData);
                alert(`저장 실패: ${errorData.message || "알 수 없는 에러"}`);
            }
        } catch (error) {
            console.error("통증 기록 저장 중 에러:", error);
            alert("통증 기록 저장 중 문제가 발생했습니다.");
        }

        // 초기화
        setStep(1);
        setSelectedDate("");
        setSelectedTime("");
        setSelectedParts([]);
        setSelectedPainTypes([]);
        setIntensity(0);
        setDuration("");
        setAdditionalInfo({
            aggravatingFactors: "",
            relievingFactors: "",
            treatmentResponse: "",
            notes: "",
        });
    };

    return (
        <>
            <Reset />
            <TopBarComponent />
            <Wrapper>
                <Container>
                    <LeftSection>
                        <BodyDiagramContainer>
                            <BodyDiagram
                                value={selectedParts}
                                onChange={handleBodyPartSelection}
                                selectedParts={selectedParts}
                                disabled={step > 1}
                            />
                        </BodyDiagramContainer>
                    </LeftSection>
                    <RightSection>
                        {step === 1 && (
                            <PainRecord1
                                onNext={(date, time, duration) => {
                                    handleDateTimeSelection(date, time, duration);
                                    handleNextStep();
                                }}
                                selectedParts={selectedParts}
                                subPartOptions={subPartOptions}
                                onSubPartSelect={handleSubPartSelection}
                            />
                        )}
                        {step === 2 && (
                            <PainRecord2
                                onNext={handleNextStep}
                                selectedPainTypes={selectedPainTypes}
                                setSelectedPainTypes={setSelectedPainTypes}
                                selectedDate={selectedDate}
                            />
                        )}
                        {step === 3 && (
                            <PainRecord3
                                onSubmit={handleIntensitySelection} // 통증 강도 선택 후 다음 단계로 이동
                                painIntensity={intensity}
                                selectedDate={selectedDate}
                            />
                        )}
                        {step === 4 && (
                            <PainRecord4
                                selectedDate={selectedDate}
                                onSubmit={handleAdditionalInfoSubmit} // 최종 데이터 제출
                            />
                        )}
                    </RightSection>
                </Container>
            </Wrapper>
        </>
    );
}
