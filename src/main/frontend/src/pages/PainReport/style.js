import styled from "styled-components";

// 전체 컨테이너
export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px auto;
    width: 210mm; /* A4 너비 */
    height: auto; /* 높이는 자동 */
    background: white; /* 배경 흰색 */
    padding: 20px;
`;

// 보고서 내용
export const ReportContent = styled.div`
    white-space: pre-wrap;
    width: 170mm; /* A4 너비에서 여백 제외 */
    padding: 20px;
    margin: 10px 0;
    line-height: 1.6;
    font-size: 12px; /* PDF에 적합한 글자 크기 */
    border-radius: 10px;
    border: 1px solid #ccc; /* 얇은 테두리 */
    background-color: #D7E8FF;; /* 연한 배경 */
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    position: relative;

    h1, h2, h3 {
        text-align: center;
        margin: 10px 0;
        font-size: 16px; /* 제목 크기 */
    }

    p {
        margin: 5px 0;
    }
`;

// PDF 다운로드 버튼
export const PDFDownload = styled.button`
    background-color: #007bff; /* 버튼 색상 */
    border: none;
    border-radius: 20px;
    font-weight: bold;
    font-size: 14px;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

export const BodyWrapper = styled.div`
    text-align: right;
    margin-bottom: 20px;
    position: absolute;
    top: 30px;
    right: 60px;
`
