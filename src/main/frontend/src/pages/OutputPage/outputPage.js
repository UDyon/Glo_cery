import React, {useEffect, useState} from "react";
import {Reset} from "styled-reset";
import Cookies from "js-cookie";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function OutputPage(){

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [reportContent, setReportContent] = useState(""); // 보고서 내용 저장
    const menu = localStorage.getItem('menu');

    return(
        <>
            <Reset/>
            <h1>output</h1>

            <div dangerouslySetInnerHTML={{__html: menu}}/>
        </>
    );
}