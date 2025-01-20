// page2.js
import React, { useState } from 'react';
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
} from './style';
import { Reset } from 'styled-reset';

// 한글 키와 영문 키 매핑
const categoryMap = {
    육류: "meat",
    해산물: "seafood",
    채소: "vegetable",
    조미료: "seasoning",
    과일: "fruit",
    기타: "others",
};

// 한글 키 형식의 데이터를 영문 키 형식으로 변환
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

// 새롭게 들어온 데이터 형식
const originalData = {
    육류: [],
    해산물: ["고등어"],
    채소: ["감자", "무", "양파", "청양고추", "대파", "양념고추"],
    조미료: ["고춧가루", "고추장", "고추가루", "된장"],
    과일: [],
    기타: ["생강", "다진마늘", "청주"],
};

// 변환된 데이터
const exampleData = transformData(originalData);


const categoryOrder = ["vegetable", "meat", "seafood", "seasoning", "fruit", "others"];

const Page2 = () => {
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
                                isActive={index === currentCategoryIndex}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)} x {exampleData[category].length}
                            </LeftItem>
                        ))}
                    </LeftItemList>
                    <Section>
                        <Title>Send</Title>
                        <Divider/>
                        <SendButton>카카오톡 전송하기</SendButton>
                    </Section>
                </LeftPanel>
                <RightPanel>
                    <SvgBackground>
                        <Title>{currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}</Title>
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