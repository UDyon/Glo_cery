/* eslint-disable */
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Cookies from "js-cookie";

export default function PainChart() {
    const [data, setData] = useState([]);
    const jwtToken = Cookies.get("authToken");

    useEffect(() => {
        async function fetchPainData() {
            try {
                const response = await fetch("/api/pains/recent", {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`, // JWT 토큰 포함
                    },
                });
                if (response.ok) {
                    const painData = await response.json();
                    // API 데이터를 그래프 형식에 맞게 변환
                    const sortedData = painData.sort((a, b) => new Date(a.date) - new Date(b.date));
                    const formattedData = sortedData.map((item, index) => ({
                        name: `Day ${index + 1}`,
                        value: item.intensity,
                        date: item.date, // 날짜 추가 (툴팁 등에서 사용할 수 있음)
                    }));
                    setData(formattedData);
                } else {
                    console.error("Failed to fetch pain data");

                }
            } catch (error) {
                console.error("Error fetching pain data: ", error);
            }
        }

        fetchPainData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
