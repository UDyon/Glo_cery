import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const CategorySelector = ({ keyword, setKeyword, infoTexts }) => {
    return (
        <div>
            <div style={{fontSize: '13px', color: 'gray', margin: '30px 0 10px 0'}}>카테고리</div>
            <div style={{ display: "flex", gap: "10px" }}>
                {["의원", "병원", "종합병원"].map((type) => (
                    <label
                        key={type}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                        }}
                    >
                        <input
                            type="radio"
                            value={type}
                            checked={keyword === type}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        {type}
                        <div
                            style={{
                                position: "relative",
                                display: "inline-block",
                            }}
                        >
                            <FaInfoCircle
                                style={{ color: "#555", cursor: "pointer" }}
                                title={infoTexts[type]} // 마우스 오버 시 기본 브라우저 툴팁
                            />
                            {/* 마우스 오버 시 커스텀 툴팁 */}
                            <span
                                style={{
                                    visibility: "hidden",
                                    position: "absolute",
                                    bottom: "100%",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    backgroundColor: "#555",
                                    color: "#fff",
                                    padding: "5px 10px",
                                    borderRadius: "4px",
                                    fontSize: "12px",
                                    whiteSpace: "nowrap",
                                    zIndex: 100,
                                }}
                            >
                                {infoTexts[type]}
                            </span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CategorySelector;
