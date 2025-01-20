import React, {useState} from "react";
import {Reset} from "styled-reset";
import Cookies from "js-cookie";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function InputPage(){

    const navigate = useNavigate();
    const [menu, setMenu] = useState('고등어조림, 감자탕, 김치찌개');
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [reportContent, setReportContent] = useState(""); // 보고서 내용 저장

    const formatContent = (content) => {
        const formattedContent = content
            .replace(
                /\*\*(.*?)\*\*/g, // **으로 감싸진 텍스트를 bold와 font-size 스타일 적용
                "<span style='font-weight: bold; font-size: 20px;'>$1</span>"
            )
            .replace(
                /^- /gm, // -로 시작하는 문장의 앞에 공백 추가
                "    - "
            );
        return formattedContent;
    };

    // 보고서 생성
    const onClickSubmit = async () => {
        setLoading(true);

        try {
            const response = await axios.post(
                `/api/reports`, // Spring Boot API 엔드포인트
                {menu},
                {}
            );

            // 보고서 내용 저장
            setReportContent(formatContent(response.data)); // 포맷팅된 내용을 저장
            console.log("보고서 내용:", response.data);
            localStorage.setItem('menu', formatContent(response.data));
            navigate('/outputPage');
        } catch (error) {
            console.error("보고서 생성 중 오류 발생:", error);
            alert("보고서를 생성하는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);

        }
    };
    return(
        <>
            <Reset/>
            <h1>input</h1>
            <button onClick={onClickSubmit}>
                End
            </button>
            <div dangerouslySetInnerHTML={{__html: reportContent}}/>
        </>
    );
}