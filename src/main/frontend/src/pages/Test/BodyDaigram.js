import React from "react";
import BodySvg from "./BodySvg";

export default function BodyDiagram({ value, onChange }) {
    const onPartClick = (name) => {
        const index = value.indexOf(name);
        if (index === -1) {
            onChange([...value, name]);
        } else {
            const newSelection = [...value];
            newSelection.splice(index, 1);
            onChange(newSelection);
        }
    };

    return (
        <div className="BodyDiagramWrapper">
            <div className="BodyDiagram">
                <BodySvg
                    selected={value}
                    onPartClick={onPartClick}
                    style={{ width: "100%", maxHeight: "100%" }}
                />
            </div>
        </div>
    );
}

