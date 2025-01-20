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

const exampleData = {
    meat: [],
    seafood : ["고등어"],
    vegetable : ["감자", "무", "양파", "청양고추", "대파", "양념고추"],
    seasoning : ["고춧가루", "고추장", "고추가루", "된장"],
    fruit: [],
    others: ["생강", "다진마늘", "청주"],
};

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