import React from "react";
import BodySvg from "./BodySvg";

const partNameMapping = {
    "머리": "head",
    "목": "neck",
    "윗배": "upper-abdomen",
    "등허리": "upper-abdomen",
    "아랫배": "torso",
    "골반": "torso",
    "왼손": "left-hand",
    "왼쪽 손목": "left-wrist",
    "왼쪽 전완(팔뚝)": "left-wrist",
    "왼쪽 팔꿈치": "left-elbow",
    "왼쪽 어깨": "left-shoulder",
    "왼쪽 가슴": "left-chest",
    "왼쪽 등": "left-chest",
    "왼쪽 허벅지": "left-thigh",
    "왼쪽 무릎": "left-knee",
    "왼쪽 종아리": "left-ankle",
    "왼쪽 발목": "left-ankle",
    "왼발": "left-foot",
    "오른손": "right-hand",
    "오른쪽 손목": "right-wrist",
    "오른쪽 전완(팔뚝)": "right-wrist",
    "오른쪽 팔꿈치": "right-elbow",
    "오른쪽 상완": "right-elbow",
    "오른쪽 어깨": "right-shoulder",
    "오른쪽 가슴": "right-chest",
    "오른쪽 등": "right-chest",
    "오른쪽 허벅지": "right-thigh",
    "오른쪽 무릎": "right-knee",
    "오른쪽 종아리": "right-ankle",
    "오른쪽 발목": "right-ankle",
    "오른발": "right-foot",
};

export default function BodyDiagram({ value, onChange }) {
    const mappedSelectedParts = value.map((name) => partNameMapping[name] || name);

    const onPartClick = (name) => {
        const koreanName = Object.keys(partNameMapping).find(
            (key) => partNameMapping[key] === name
        );
        if (value.includes(koreanName)) {
            // 이미 선택된 부위를 다시 클릭하면 선택 해제
            onChange(value.filter((part) => part !== koreanName));
        } else {
            // 선택되지 않은 부위를 클릭하면 추가
            onChange([...value, koreanName]);
        }
    };

    return (
        <div className="BodyDiagramWrapper">
            <div className="BodyDiagram">
                <BodySvg
                    selected={mappedSelectedParts}
                    onPartClick={onPartClick}
                    style={{ width: "100%", maxHeight: "100%" }}
                />
            </div>
        </div>
    );
}

