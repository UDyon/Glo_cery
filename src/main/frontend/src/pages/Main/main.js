/* eslint-disable */

import { Reset } from "styled-reset";
import React, { useState, useEffect } from "react";
import TopBarComponent from "../../components/TopBarComponent";
import {
    Wrapper,
    InfoContainer,
    LeftSection,
    CenterSection,
    Button,
    RightSection,
    GraphTipContainer,
    GraphSection,
    TipSection,
    HealthTips,
} from "./style";
import PainChart from "./components/painChart";
import WeatherView from "./components/weatherView";
import { getTodayTips } from "./components/healthTips";
import { fetchWeather, fetchForecast } from "./components/weatherService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const todayTips = getTodayTips();

export default function Main() {
    const [weatherData, setWeatherData] = useState(null);
    const [todayTemp, setTodayTemp] = useState({ maxTemp: null, minTemp: null });
    const [username, setUsername] = useState(""); // 사용자 이름 상태 추가
    // eslint-disable-next-line
    const [lastPainDate, setLastPainDate] = useState(null); // 마지막 통증 기록 날짜 상태 추가
    const [daysSinceLastPain, setDaysSinceLastPain] = useState(null); // 며칠 전인지 상태 추가
    const navigate = useNavigate();
    const jwtToken = Cookies.get("authToken");


    useEffect(() => {
        if (jwtToken) {
            try {
                const decoded = jwtDecode(jwtToken); // JWT 디코딩
                setUsername(decoded.username || "사용자"); // username 가져오기
            } catch (error) {
                console.error("JWT 디코딩 실패:", error);
            }
        }
    }, [jwtToken]);

    useEffect(() => {
        async function fetchLastPainDate() {
            try {
                const response = await fetch(`/api/pains`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`, // JWT 토큰 포함
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        // 최신 날짜 찾기
                        const latestRecord = data.reduce((latest, record) => {
                            const recordDate = new Date(record.painDate);
                            return recordDate > new Date(latest.painDate) ? record : latest;
                        });

                        const lastDate = new Date(latestRecord.painDate); // 최신 기록 날짜
                        setLastPainDate(lastDate);

                        const today = new Date();
                        const differenceInTime = today - lastDate; // 밀리초 차이 계산
                        const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환
                        setDaysSinceLastPain(differenceInDays);
                    } else {
                        setLastPainDate(null);
                        setDaysSinceLastPain(null);
                    }
                } else {
                    console.error("통증 기록을 가져오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error("통증 기록 가져오기 실패:", error);
            }
        }

        if (jwtToken) {
            fetchLastPainDate();
        }
    }, [jwtToken]);

    // 현재 날씨 정보 가져오기
    useEffect(() => {
        async function getWeather() {
            const data = await fetchWeather("gyeongsan-si");
            if (data) {
                setWeatherData(data);
            }
        }
        getWeather();
    }, []);

    // 오늘의 최고/최저 기온 가져오기
    useEffect(() => {
        async function getForecast() {
            const data = await fetchForecast("gyeongsan-si");
            if (data) {
                setTodayTemp(data);
            }
        }
        getForecast();
    }, []);

    return (
        <>
            <Reset />
            <TopBarComponent />
            <Wrapper>
                <InfoContainer>
                    <LeftSection>
                        {jwtToken ? (
                            <h2>
                                <span>{username}</span> 님의
                                <br />
                                {daysSinceLastPain !== null ? (
                                    <>
                                        마지막 통증 기록은
                                        <br />
                                        <span>{`${daysSinceLastPain}일 전`}</span> 입니다.
                                    </>
                                ) : (
                                    <>
                                        기록된 통증 정보가 <br /> <span>없습니다.</span>
                                    </>
                                )}
                            </h2>
                        ) : (
                            <h2>
                                서비스를 이용하려면 <br/>
                                <span>로그인</span>해주세요
                            </h2>
                        )}
                    </LeftSection>

                    {jwtToken ? (
                        <CenterSection onClick={() => navigate("/painRecord")}>
                            <Button>
                                통증 기록
                                <br /> 바로가기
                                <svg
                                    width="63"
                                    height="122"
                                    viewBox="0 0 63 122"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1 1L61 61L1 121" />
                                </svg>
                            </Button>
                        </CenterSection>
                    ) : (
                        <CenterSection></CenterSection>
                    )}


                    <RightSection>
                        <WeatherView weatherData={weatherData} todayTemp={todayTemp} />
                    </RightSection>
                </InfoContainer>

                <GraphTipContainer>
                    <GraphSection>
                        <h3>내 통증 그래프</h3>
                        <PainChart/>
                    </GraphSection>
                    <TipSection>
                        <h3>오늘의 통증 관리 Tip!</h3>
                        <HealthTips>
                            <ul>
                                {todayTips.map((tip, index) => (
                                    <li key={index}>{tip}</li>
                                ))}
                            </ul>
                        </HealthTips>
                    </TipSection>
                </GraphTipContainer>
            </Wrapper>
        </>
    );
}
