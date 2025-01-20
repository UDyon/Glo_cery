import React, { useEffect, useState } from "react";

export default function OutputPage() {
    const [formattedMenu, setFormattedMenu] = useState({
        육류: [],
        해산물: [],
        채소: [],
        조미료: [],
        과일: [],
        기타: [],
    });

    const menu = localStorage.getItem("menu"); // 로컬 스토리지에서 메뉴 데이터 가져오기

    useEffect(() => {
        if (menu) {
            // menu가 존재하는 경우에만 함수 호출
            const newFormattedMenu = {
                육류: [],
                해산물: [],
                채소: [],
                조미료: [],
                과일: [],
                기타: [],
            };
            formatContent(menu, newFormattedMenu);
            setFormattedMenu(newFormattedMenu); // 상태 업데이트
            console.log(newFormattedMenu);
        }
    }, [menu]);

    const formatContent = (menu, formattedMenu) => {
        // 메뉴 데이터를 각 카테고리에 맞게 분리하여 formattedMenu에 추가
        const lines = menu.split("\n"); // menu가 문자열로 분리 가능해야 함
        lines.forEach((line) => {
            const match = line.match(/\*\*(.*?)\*\*\s*(.*)/); // **카테고리**와 내용을 매칭
            if (match) {
                const category = match[1]; // 카테고리명
                const items = match[2]
                    .split(",")
                    .map((item) => item.trim()) // 쉼표로 구분된 항목을 배열로 분리
                    .filter((item) => item !== "없음"); // '없음'은 제외
                if (formattedMenu[category]) {
                    formattedMenu[category] = [...formattedMenu[category], ...items];
                }
            }
        });
    };

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
