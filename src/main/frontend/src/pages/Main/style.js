import styled from "styled-components";

// 전체 Wrapper
export const Wrapper = styled.div`
    font-family: "Arial", sans-serif;
    color: #333;
    box-sizing: border-box;
    width: 100%;
    height: calc(100vh - 100px); /* 전체 높이에서 100px(상단바) 제외 */
    position: relative;
    
    @media {
        padding: 0 20px;
    }
`;

// 사용자 정보 및 날씨 섹션 컨테이너
export const InfoContainer = styled.div`
    height: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        flex-direction: column; /* 모바일에서 세로 정렬 */
        height: auto; /* 높이를 자동 조정 */
        margin-top: 20px;
        margin-bottom: 10px;
    }
`;

// 왼쪽 섹션
export const LeftSection = styled.div`
    flex: 0.7;
    display: flex;
    margin-left: 40px;
    align-items: center;

    h2 {
        font-size: calc(2.4vw + 10px); // 동적으로 조절
        line-height: 1.4;
        text-align: left;

        span {
            font-weight: bold;
        }

        span:first-of-type {
            color: #00008b;
        }

        span:last-of-type {
            color: #FFAE00;
        }
    }

    @media (max-width: 768px) {
        margin-left: 0;
    }
`;

// 가운데 섹션
export const CenterSection = styled.div`
    flex: 0.5;
    height: 80%;
    display: flex;
    margin-right: 20px;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        margin-right: 0;
        justify-content: flex-end; /* 모바일에서 오른쪽 정렬 */
    }
`;

export const Button = styled.button`
    display: flex;
    flex-direction: row; /* 텍스트와 SVG를 수평 정렬 */
    align-items: center; /* 텍스트와 SVG를 수직 가운데 정렬 */
    justify-content: center;
    height: 100%;
    width: 100%;
    background: #ffcc66;
    border: 3px solid #FFAE00;
    border-radius: 40px;
    font-size: calc(2.0vw + 15px);
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    outline: none;
    text-align: center;

    &:hover {
        background: #ffa500;
    }

    svg {
        margin-left: 40px; /* 텍스트와 SVG 사이 여백 */
        stroke: #fff; /* SVG 선 색상 변경 */
        stroke-width: 8;
        fill: none; /* SVG 채우기 색상 없음 */
        width: 40px;
        height: 80px;
    }
`;

// 오른쪽 섹션
export const RightSection = styled.div`
    flex: 1;
    height: 80%;
    background: #fff8e6;
    border: 3px solid #FFAE00;
    border-radius: 40px;
    margin-right: 40px;
    display: flex;
    flex-direction: row; /* 수평 정렬 */
    align-items: center; /* 세로 가운데 정렬 */
    justify-content: space-between; /* 내부 요소 간격 */
    overflow-y: auto;
    padding: 20px 0;

    &::-webkit-scrollbar {
        width: 10px;
    }

    @media (max-width: 768px) {
        margin-right: 0;
        margin-top: 20px; /* 모바일에서 위 간격 추가 */
        width: 100%;
    }
`;

export const GraphTipContainer = styled.div`
    height: calc(100% - 40% - 90px);
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column; /* 모바일에서 세로 정렬 */
        height: auto; /* 높이를 자동 조정 */
        margin-top: 20px;
    }
`;

// 그래프 섹션
export const GraphSection = styled.section`
    flex: 1.2;
    background: #e6f7ff;
    border: 3px solid #110078;
    margin-left: 40px;
    margin-right: 20px;
    border-radius: 40px;
    height: 100%;
    overflow-y: auto;

    h3 {
        font-size: 30px;
        margin-left: 40px;
        margin-top: 40px;
        margin-bottom: 20px;
        font-weight: bold;
        color: #110078;
    }

    &::-webkit-scrollbar {
        width: 10px;
    }

    @media (max-width: 768px) {
        margin: 10px 0;
        width: 100%;
    }
`;

// 건강 팁 섹션
export const TipSection = styled.section`
    flex: 1;
    background: #fff;
    border: 3px solid #110078;
    margin-right: 40px;
    border-radius: 40px;
    align-items: flex-start; /* 왼쪽 정렬 */
    overflow-y: auto;
    height: 100%;

    h3 {
        font-size: 40px;
        margin-left: 40px;
        margin-top: 40px;
        margin-bottom: 30px;
        font-weight: bold;
        color: #110078;
    }

    &::-webkit-scrollbar {
        width: 10px; 
    }

    @media (max-width: 768px) {
        margin: 10px 0;
        width: 100%;
    }
`;

export const HealthTips = styled.section`
    flex: 1;
    font-size: 18px; 
    margin: 0 20px; 
    padding: 0 10px; 
    line-height: 1.8; 
    color: #555; 
    border-radius: 10px;

    ul {
        list-style-type: disc; /* 기본 리스트 스타일 */
        margin-left: 20px; /* 리스트 왼쪽 여백 */
        padding: 0;
    }

    li {
        margin-bottom: 10px; /* 리스트 항목 간 간격 */
        padding: 5px 0; /* 항목 상하 패딩 */
        border-bottom: 1px solid #eee; /* 리스트 항목 구분선 */
        color: #333; /* 리스트 텍스트 색상 */
    }

    li:last-child {
        border-bottom: none; /* 마지막 항목은 구분선 제거 */
    }
`;