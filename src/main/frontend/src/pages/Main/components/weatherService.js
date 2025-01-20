import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather';
const BASE_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast';

// 현재 날씨
export async function fetchWeather(city) {
    try {
        const response = await axios.get(BASE_URL_WEATHER, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'kr',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        return null;
    }
}

// 오늘의 최고/최저 기온
export async function fetchForecast(city) {
    try {
        // 현재 날씨 데이터 가져오기
        const currentWeatherResponse = await axios.get(BASE_URL_WEATHER, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'kr',
            },
        });

        const currentTemp = currentWeatherResponse.data.main.temp; // 현재 기온

        //예보 데이터 가져오기
        const forecastResponse = await axios.get(BASE_URL_FORECAST, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'kr',
            },
        });

        // 현재 한국 시간 기준으로 오늘 날짜 구하기 (YYYY-MM-DD 형식)
        const koreaTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
        const today = new Date(koreaTime).toLocaleDateString('en-CA'); // "YYYY-MM-DD" 형식

        // 오늘 날짜의 예보 데이터 필터링
        const todayForecasts = forecastResponse.data.list.filter((item) => {
            const itemDate = item.dt_txt.split(' ')[0]; // "YYYY-MM-DD"
            return itemDate === today;
        });

        // temp_min의 최솟값과 temp_max의 최댓값 계산
        let maxTemp = -Infinity;
        let minTemp = Infinity;

        todayForecasts.forEach((item) => {
            maxTemp = Math.max(maxTemp, item.main.temp_max);
            minTemp = Math.min(minTemp, item.main.temp_min);
        });

        // 현재 기온과 비교하여 업데이트
        if (currentTemp > maxTemp) {
            maxTemp = currentTemp;
        }
        if (currentTemp < minTemp) {
            minTemp = currentTemp;
        }

        return {
            maxTemp,
            minTemp,
        };
    } catch (error) {
        console.error('Failed to fetch forecast or current weather data:', error);
        return { maxTemp: null, minTemp: null };
    }
}




