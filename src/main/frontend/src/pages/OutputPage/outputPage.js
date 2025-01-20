import React, { useEffect, useState } from "react";
import { Reset } from "styled-reset";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formattedMenu = {
    육류: [],
    해산물: [],
    채소: [],
    조미료: [],
    과일: [],
    기타: [],
};

export default function OutputPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [reportContent, setReportContent] = useState(""); // 보고서 내용 저장
    const menu = localStorage.getItem("menu"); // 로컬 스토리지에서 메뉴 데이터 가져오기

    useEffect(() => {
        if (menu) {
            // menu가 존재하는 경우에만 함수 호출
            formatContent(menu, formattedMenu);
        }
    }, [menu]);



    return (
        <>
            <h1>Output</h1>
            <div>
                <h2>육류</h2>
                <p>{formattedMenu["육류"].join(", ") || ""}</p>
                <h2>해산물</h2>
                <p>{formattedMenu["해산물"].join(", ") || ""}</p>
                <h2>채소</h2>
                <p>{formattedMenu["채소"].join(", ") || ""}</p>
                <h2>조미료</h2>
                <p>{formattedMenu["조미료"].join(", ") || ""}</p>
                <h2>과일</h2>
                <p>{formattedMenu["과일"].join(", ") || ""}</p>
                <h2>기타</h2>
                <p>{formattedMenu["기타"].join(", ") || ""}</p>
            </div>
        </>
    );
}
