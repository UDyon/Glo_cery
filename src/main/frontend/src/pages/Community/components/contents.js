import React, {useEffect, useState} from "react";
import {Category, Option, Content, OptionWrapper, NewButton} from "./style";
import {useNavigate} from "react-router-dom";
import {ContentsWrapper} from "../style";
import axios from "axios";

export default function Contents({searchValue}) {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("전체");     // 카테고리 옵션 영어
    const [selectedOptionKr, setSelectedOptionKr] = useState("전체"); // 카테고리 옵션 한국어 (UI 용)
    const [posts, setPosts] = useState([]); // 게시물 데이터 저장

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const selectOption = (option) => {
        const categoryMap = {
            'PAIN_TIPS' : '통증 관리 팁',
            'DISEASE_INFO' : '질병 및 통증 정보',
            'TREATMENT_EXPERIENCE' : '치료 및 재활 경험',
            'HOSPITAL_REVIEW' : '병원 리뷰',
            'HEALTH_CONSULTING' : '건강 상담'
        };
        if (categoryMap[option]) {
            setSelectedOptionKr(categoryMap[option]); // 선택한 옵션 한국어 저장
        }
        setSelectedOption(option); // 선택한 옵션 영어 저장
        setDropdownOpen(false); // 드롭다운 닫기
    };

    const closeDropdown = (e) => {
        if (!e.target.closest(".dropdown")) {
            setDropdownOpen(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener("click", closeDropdown);
        return () => {
            window.removeEventListener("click", closeDropdown);
        };
    }, []);

    const onClickNewButton = () => {
        navigate('/new')
    }

    // 게시물 상세페이지로 이동
    const handleGoPost = (id) => {
        navigate(`/postDetail/${id}`);
    }

    // 게시물 가져오기
    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await axios.get(`/api/posts`);
                setPosts(response.data); // 게시물 데이터 저장
                console.log('게시물:',response.data)
            } catch (error) {
                console.error('Failed to fetch contents', error);
            }
        };
        fetchContents();
    }, []);

    return (
        <ContentsWrapper>
            <div style={{width: '100%', height: 'auto', display:'flex', justifyContent: 'space-between'}}>
                <div> {/* 드롭다운 메뉴 */}
                    <p style={{fontSize: '14px', color: 'gray', margin: '5px 0'}}>카테고리</p>
                    <div className="dropdown" style={{position: "relative", display: "inline-block"}}>
                        <Category onClick={toggleDropdown}>{selectedOptionKr}</Category>
                        {/* 드롭다운 메뉴 내용 */}
                        {dropdownOpen && (
                            <OptionWrapper>
                                <Option
                                    href=""
                                    onClick={() => selectOption("전체")}
                                >
                                    전체
                                </Option>
                                <Option
                                    href="#PAIN_TIPS"
                                    onClick={() => selectOption("PAIN_TIPS")}
                                >
                                    통증 관리 팁
                                </Option>
                                <Option
                                    href="#DISEASE_INFO"
                                    onClick={() => selectOption("DISEASE_INFO")}
                                >
                                    질병 및 통증 정보
                                </Option>
                                <Option
                                    href="#TREATMENT_EXPERIENCE"
                                    onClick={() => selectOption("TREATMENT_EXPERIENCE")}
                                >
                                    치료 및 재활 경험
                                </Option>
                                <Option
                                    href="#HOSPITAL_REVIEW"
                                    onClick={() => selectOption("HOSPITAL_REVIEW")}
                                >
                                    병원 리뷰
                                </Option>
                                <Option
                                    href="#HEALTH_CONSULTING"
                                    onClick={() => selectOption("HEALTH_CONSULTING")}
                                >
                                    건강 상담
                                </Option>
                            </OptionWrapper>
                        )}
                    </div>
                </div> {/* 드롭다운 끝 */}
                <NewButton onClick={onClickNewButton}>글쓰기</NewButton>
            </div>

            {/* 선택된 카테고리에 따라 게시글 필터링 */}
            {posts
                .filter(
                    post =>
                        (selectedOption === "전체" || post.category === selectedOption) &&
                        (searchValue === "" || post.title.includes(searchValue))
                )
                .map((post, index) => (
                    <Content onClick={() => handleGoPost(post.id)} key={index}>
                        <p>{post.title}</p>
                        <p style={{ color: 'rgb(0, 0, 0, 0.6)' }}>{post.authorName}</p>
                    </Content>
                ))}

        </ContentsWrapper>

    );
}
