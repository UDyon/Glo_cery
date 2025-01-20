import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loading.css'; // 스타일 파일 불러오기

// 소리 파일 경로
import successSound from './결제.mp3';
import {Reset} from "styled-reset";
import axios from "axios";

const Loading = () => {
    const [menu, setMenu] = useState(() => {
        const savedMenu = localStorage.getItem("menu");
        // 저장된 값이 없거나 유효한 JSON이 아닐 경우 빈 배열로 초기화
        try {
            return savedMenu ? JSON.parse(savedMenu) : [];
        } catch {
            return [];
        }
    });
    const [loadingMessage, setLoadingMessage] = useState('당근 찾는 중...');
    const navigate = useNavigate();

    const [reportContent, setReportContent] = useState(""); // 보고서 내용 저장

    const messages = [
        '당근 찾는 중...',
        '고기 담는 중...',
        '생선 포장하는 중...',
        '완료!'
    ];

    const onClickSubmit = async () => {
        localStorage.setItem('menu','');

        const menuString = menu.join(', ');

        try {
            const response = await axios.post(
                `/api/reports`, // Spring Boot API 엔드포인트
                {menuString},
                {}
            );

            // 보고서 내용 저장
            setReportContent(response.data); // 포맷팅된 내용을 저장
            console.log("내용:", response.data);
            localStorage.setItem('menu', response.data);
        } catch (error) {
            console.error("생성 중 오류 발생:", error);
            alert("생성하는 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex++;
            if (currentIndex < messages.length) {
                setLoadingMessage(messages[currentIndex]);

                // "완료!" 메시지가 표시될 때 소리 재생
                if (messages[currentIndex] === '완료!') {
                    const audio = new Audio(successSound);
                    audio.play().then(() => {
                        console.log('소리가 성공적으로 재생되었습니다.');
                    }).catch((error) => {
                        console.error('소리 재생 실패:', error);
                    });
                }
            } else {
                clearInterval(interval);

                // 1초 후 다음 페이지로 이동
                setTimeout(() => navigate('/page2'), 1000);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    useEffect(() => {
        onClickSubmit();
    }, [menu]);

    return (
        <>
            <Reset/>
            <div className="loading-container">
                {loadingMessage}
            </div>
        </>

    );
};

export default Loading;
