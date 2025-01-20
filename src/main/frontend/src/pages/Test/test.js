import React from "react";
import BodyDiagram from "./BodyDaigram";
import "./style.css";
import styled from "styled-components";
import TopBarComponent from "../../components/TopBarComponent";

const Wrapper=styled.div`
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
`
export default function Test() {
    const [selected, setSelected] = React.useState([]);

    return (
        <Wrapper>
            <TopBarComponent/>
            <BodyDiagram value={selected} onChange={setSelected} />
        </Wrapper>
    );
}
