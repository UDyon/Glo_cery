import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 사용
import './Frist.css';

const Frist = () => {
    const [selectedDay, setSelectedDay] = useState('');
    const [joinedDays, setJoinedDays] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
    });

    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setJoinedDays((prevState) => {
            const updatedState = { ...prevState };
            Object.keys(updatedState).forEach((key) => {
                updatedState[key] = key === day; // 클릭된 요일만 true
            });
            return updatedState;
        });
    };

    const handleEndClick = () => {
        navigate('/loading'); // 로딩 페이지로 이동
    };

    return (
        <div className="container">
            {/* 왼쪽 메뉴 */}
            <div className="sidebar">
                <h1>Glo:cery</h1>
                <div className="day-list">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <div key={day} className="day-item">
                            <button
                                className={selectedDay === day ? 'day-button selected' : 'day-button'}
                                onClick={() => handleDayClick(day)}
                            >
                                {day}
                            </button>
                            <div className="box"></div>
                        </div>
                    ))}
                </div>
                <div className="total-section">
                    <h1>Total</h1>
                    <button onClick={handleEndClick}>End</button>
                </div>
            </div>

            {/* 오른쪽 메시지 */}
            <div className="main-content">
                {joinedDays[selectedDay] ? (
                    <div className="content-box1">
                        <h2>{`${selectedDay}`}</h2>
                        <div className="sidesidebar1">
                            <div className="sidesidebar-font">Morning</div>
                        </div>
                        <div className="sidesidebar2">
                            <div className="sidesidebar-font">lunch</div>
                        </div>
                        <div className="sidesidebar3">
                            <div className="sidesidebar-font">evening</div>
                        </div>
                    </div>
                ) : (
                    <div className="content-box">
                        <h2>요일을 클릭해 식단을 입력해주세요!</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Frist;
