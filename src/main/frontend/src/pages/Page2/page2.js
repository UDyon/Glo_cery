import React, { useEffect, useState } from "react";
import {
    Wrapper,
    LeftPanel,
    RightPanel,
    Section,
    Title,
    LeftItemList,
    LeftItem,
    RightItemList,
    RightItem,
    SvgBackground,
    ArrowButton,
    SendButton,
    Divider,
} from "./style";
import { Reset } from "styled-reset";

const categoryMap = {
    육류: "meat",
    해산물: "seafood",
    채소: "vegetable",
    조미료: "seasoning",
    과일: "fruit",
    기타: "others",
};

const transformData = (data) => {
    const transformed = {};
    for (const [key, value] of Object.entries(data)) {
        const englishKey = categoryMap[key];
        if (englishKey) {
            transformed[englishKey] = value;
        }
    }
    return transformed;
};

const categoryOrder = ["vegetable", "meat", "seafood", "seasoning", "fruit", "others"];

const Page2 = () => {
    const menu = localStorage.getItem("menu"); // 로컬 스토리지에서 메뉴 데이터 가져오기
    const [originalData, setOriginalData] = useState({
        육류: [],
        해산물: [],
        채소: [],
        조미료: [],
        과일: [],
        기타: [],
    });

    // 문장 깔끔하게 format
    const formatContent = (menu) => {
        const formattedMenu = {
            육류: [],
            해산물: [],
            채소: [],
            조미료: [],
            과일: [],
            기타: [],
        }; // 항상 새로운 객체로 초기화

        const lines = menu.split("\n");
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
        return formattedMenu;
    };

    useEffect(() => {
        if (menu) {
            // 항상 새로운 데이터를 생성하고 업데이트
            const formattedMenu = formatContent(menu);
            setOriginalData(formattedMenu);
        }
    }, [menu]);

    const exampleData = transformData(originalData);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

    const handleNextCategory = () => {
        setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % categoryOrder.length);
    };

    const handlePreviousCategory = () => {
        setCurrentCategoryIndex((prevIndex) =>
            prevIndex === 0 ? categoryOrder.length - 1 : prevIndex - 1
        );
    };

    const currentCategory = categoryOrder[currentCategoryIndex];
    const currentItems = exampleData[currentCategory];

    return (
        <>
            <Reset />
            <Wrapper>
                <LeftPanel>
                    <Title>Ingredient List</Title>
                    <LeftItemList>
                        {categoryOrder.map((category, index) => (
                            <LeftItem
                                key={category}
                                className={index === currentCategoryIndex ? "active" : ""}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)} x{" "}
                                {exampleData[category].length}
                            </LeftItem>
                        ))}
                    </LeftItemList>
                    <Section>
                        <Title>Send</Title>
                        <Divider />
                        <SendButton>카카오톡 전송하기</SendButton>
                    </Section>
                </LeftPanel>
                <RightPanel>
                    <SvgBackground>
                        <Title>
                            {currentCategory.charAt(0).toUpperCase() +
                                currentCategory.slice(1)}
                        </Title>
                        <RightItemList>
                            {currentItems.map((item, index) => (
                                <RightItem key={index}>
                                    <input type="checkbox" /> {item}
                                </RightItem>
                            ))}
                        </RightItemList>
                        <ArrowButton left onClick={handlePreviousCategory}>&lt;</ArrowButton>
                        <ArrowButton onClick={handleNextCategory}>&gt;</ArrowButton>
                    </SvgBackground>
                </RightPanel>
            </Wrapper>
        </>
    );
};

export default Page2;
