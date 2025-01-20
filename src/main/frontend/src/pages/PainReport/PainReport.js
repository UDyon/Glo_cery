import React, { useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import html2pdf from "html2pdf.js";
import {BodyWrapper, Container, PDFDownload, ReportContent} from "./style";
import { Reset } from "styled-reset";
import TopBarComponent from "../../components/TopBarComponent";
import { useLocation } from "react-router-dom";
import BodySvg from "../Test/BodySvg"; // BodySvg 임포트

const PainReport = () => {
    const [reportContent, setReportContent] = useState(""); // 보고서 내용 저장
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [selectedParts, setSelectedParts] = useState([]); // 선택된 부위 상태 추가
    const location = useLocation();
    const reportRef = useRef(null); // PDF로 변환할 HTML 요소 참조
    const { region } = location.state || {};



    const partNamesInEng = {
        "머리": "head",
        "목": "neck",
        "윗배/등허리": "upper-abdomen",
        "아랫배/골반": "torso",
        "왼손": "left-hand",
        "왼쪽 손목/전완(팔뚝)": "left-wrist",
        "왼쪽 팔꿈치/상완": "left-elbow",
        "왼쪽 어깨": "left-shoulder",
        "왼쪽 가슴/등": "left-chest",
        "왼쪽 허벅지": "left-thigh",
        "왼쪽 무릎": "left-knee",
        "왼쪽 종아리/발목": "left-ankle",
        "왼발": "left-foot",
        "오른손": "right-hand",
        "오른쪽 손목/전완(팔뚝)": "right-wrist",
        "오른쪽 팔꿈치/상완": "right-elbow",
        "오른쪽 어깨": "right-shoulder",
        "오른쪽 가슴/등": "right-chest",
        "오른쪽 허벅지": "right-thigh",
        "오른쪽 무릎": "right-knee",
        "오른쪽 종아리/발목": "right-ankle",
        "오른발": "right-foot",
    };

    console.log('partNamesInEng[region]:',partNamesInEng[region]);


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

    // 통증 보고서 생성 요청
    const generateReport = async () => {
        setLoading(true);
        const token = Cookies.get("authToken"); // JWT 토큰 가져오기

        if (!token) {
            alert("토큰이 없습니다. 로그인 후 다시 시도해주세요.");
            return;
        }

        try {
            const response = await axios.post(
                `/api/reports/${region}`, // Spring Boot API 엔드포인트
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
                    },
                }
            );

            // 보고서 내용 저장
            setReportContent(formatContent(response.data)); // 포맷팅된 내용을 저장
            console.log("보고서 내용:", response.data);
        } catch (error) {
            console.error("보고서 생성 중 오류 발생:", error);
            alert("보고서를 생성하는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // PDF 다운로드
    const downloadPdf = () => {
        const element = reportRef.current; // PDF로 변환할 HTML 요소
        const options = {
            margin: [10, 10, 10, 10], // PDF 여백 제거
            filename: "pain_report.pdf",
            image: { type: "jpeg", quality: 1 }, // 이미지 품질 최대화
            html2canvas: {
                scale: 2, // HTML 캔버스 스케일을 높여 고해상도로 렌더링
                useCORS: true, // CORS 이미지 지원
            },
            jsPDF: {
                unit: "mm",
                format: "a4", // A4 크기로 설정
                orientation: "portrait", // 세로 방향
            },
        };
        html2pdf().set(options).from(reportRef.current).save();
    };

    return (
        <>
            <Reset />
            <TopBarComponent />
            <Container>
                <button onClick={generateReport} disabled={loading} style={{ marginBottom: "20px" }}>
                    {loading ? "생성 중..." : "보고서 생성"}
                </button>

                {reportContent && (
                    <>
                        <ReportContent ref={reportRef}>
                            {/* BodySvg 추가 */}
                            <BodyWrapper>
                                <BodySvg
                                    selected={partNamesInEng[region]}
                                    style={{ width: "200px", height: "400px" }}
                                />
                            </BodyWrapper>
                            {/* 보고서 내용 */}
                            <div dangerouslySetInnerHTML={{ __html: reportContent }} />
                        </ReportContent>
                        <PDFDownload onClick={downloadPdf}>PDF 다운로드</PDFDownload>
                    </>
                )}
            </Container>
        </>
    );
};

export default PainReport;
