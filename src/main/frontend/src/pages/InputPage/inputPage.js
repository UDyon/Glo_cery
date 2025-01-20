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



    // 보고서 생성
    const onClickSubmit = async () => {
        setLoading(true);

        localStorage.setItem('menu','');

        try {
            const response = await axios.post(
                `/api/reports`, // Spring Boot API 엔드포인트
                {menu},
                {}
            );

            // 보고서 내용 저장
            setReportContent(response.data); // 포맷팅된 내용을 저장
            console.log("내용:", response.data);
            localStorage.setItem('menu', response.data);
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
            <h1>input</h1>
            <button onClick={onClickSubmit}>
                End
            </button>
            <div dangerouslySetInnerHTML={{__html: reportContent}}/>
        </>
    );
}