import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loading.css'; // 스타일 파일 불러오기

// 소리 파일 경로
import successSound from './결제.mp3';
import {Reset} from "styled-reset";

const Loading = () => {
    const [loadingMessage, setLoadingMessage] = useState('당근 찾는 중...');
    const navigate = useNavigate();

    const messages = [
        '당근 찾는 중...',
        '고기 담는 중...',
        '생선 포장하는 중...',
        '완료!'
    ];

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
                setTimeout(() => navigate('/second'), 1000);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

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
