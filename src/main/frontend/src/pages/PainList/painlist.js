/* eslint-disable */
import { Reset } from "styled-reset";
import TopBarComponent from "../../components/TopBarComponent";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import React, { useEffect, useState } from "react";
import {Contain, Container, Location, ReportBtn, TopContainer, Wrapper} from "./style";
import Cookies from "js-cookie"; // 쿠키 관리 라이브러리
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom"; // JWT 디코더

export default function PainList() {
    const navigate = useNavigate();
    const [painData, setPainData] = useState([]);
    const [groupedData, setGroupedData] = useState({});


    // JWT 토큰 가져오기
    const getTokenFromCookies = () => {
        const token = Cookies.get("authToken"); // 쿠키에서 "accessToken" 읽기
        if (token) {
            try {
                const decoded = jwtDecode(token); // 토큰 디코딩 (필요하면 사용할 수 있음)
                console.log("Decoded Token:", decoded); // 디버깅용
                return token;
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
        return null;
    };

    // 보고서 생성 페이지 이동
    const handleGenerateReport = (value) => {
        navigate('/painreport', {
            state: { region: value }
        });
    }


    useEffect(() => {
        const token = getTokenFromCookies();
        if (!token) {
            console.error("No valid token found.");
            return;
        }

        fetch(`/api/pains`, {
            method: "GET",
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${token}`, // 쿠키에서 가져온 토큰 사용
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPainData(data);
                // 데이터를 location 기준으로 그룹화하고 날짜순으로 정렬
                const grouped = data.reduce((acc, curr) => {
                    if (!acc[curr.location]) {
                        acc[curr.location] = [];
                    }
                    acc[curr.location].push({
                        name: `${curr.painDate}`,
                        value: curr.intensity,
                        dateTime: new Date(`${curr.painDate}T${curr.painTime}`), // 날짜 객체 추가
                    });
                    return acc;
                }, {});

                // 각 location의 데이터를 날짜순으로 정렬
                for (const location in grouped) {
                    grouped[location].sort((a, b) => a.dateTime - b.dateTime);
                }

                setGroupedData(grouped);
            })
            .catch((error) => console.error("Error fetching pain data:", error));
    }, []);


    return (
        <>
            <Reset />
            <Wrapper>
                <TopBarComponent />
                <Contain>
                    {Object.entries(groupedData).map(([location, data]) => (
                        <>
                            <Container key={location}>
                                <TopContainer>
                                    <Location>{location}</Location>
                                    <ReportBtn onClick={() => handleGenerateReport(location)}>보고서 생성</ReportBtn>
                                </TopContainer>
                                <ResponsiveContainer width="80%" height={250}>
                                    <LineChart data={data}
                                               margin={{
                                                   top: 10,
                                                   right: 30,
                                                   left: 0,
                                                   bottom: 0,
                                               }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Container>
                        </>
                    ))}
                </Contain>


            </Wrapper>
        </>
    );
}
