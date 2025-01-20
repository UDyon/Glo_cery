import React from "react";
import styled from "styled-components";

const WeatherMain = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column; /* 아이콘과 온도를 수직 정렬 */
    align-items: center; /* 가운데 정렬 */
    justify-content: center;
    margin-left: 20px;
    margin-right: 20px; /* 오른쪽 텍스트와 간격 추가 */

    h2 {
        font-size: 40px; /* 현재 온도 크기 */
        color: #ff6f00;
        margin-top: 5px;
        margin-bottom: 25px;
    }
`;

const WeatherDetails = styled.div`
    display: flex;
    flex: 2;
    flex-direction: column; /* 텍스트 수직 정렬 */
    align-items: flex-start; /* 왼쪽 정렬 */
    justify-content: space-around;
    margin-right: 40px; 

    p {
        font-size: 15px;
        color: #555;
        margin-bottom: 20px;
    }
`;

const WeatherIcon = styled.img`
    width: 100px; /* 아이콘 크기 */
    height: 100px;
    margin-bottom: 10px; /* 현재 온도와 간격 */
`;

const WeatherMinMaxTemp = styled.h2`
    font-size: 30px;
    margin-bottom: 20px;
`;

const WeatherComment = styled.h2`
    font-size: 20px;
`;

export default function WeatherView({ weatherData, todayTemp }) {
    if (!weatherData) {
        return <WeatherMain>날씨 정보를 불러오는 중입니다...</WeatherMain>;
    }

    const { main, weather, wind } = weatherData;

    return (
        <>
            <WeatherMain>
                <WeatherIcon
                    src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt="날씨 아이콘"
                />
                <h2>{main.temp}°C</h2>
            </WeatherMain>
            <WeatherDetails>
                <WeatherMinMaxTemp>
                    {todayTemp.maxTemp}° / {todayTemp.minTemp}°
                </WeatherMinMaxTemp>
                <p>
                    체감 {main.feels_like}° | {weather[0].description} | 습도 {main.humidity}% | 풍속{" "}
                    {wind.speed}m/s
                </p>
                <WeatherComment>
                    찬바람 부는 겨울이에요. <br /> 오늘 날씨에는 감기 조심하세요!
                </WeatherComment>
            </WeatherDetails>
        </>
    );
}
