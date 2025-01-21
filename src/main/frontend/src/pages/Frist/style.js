import styled from "styled-components";

export const InputMenu = styled.textarea`
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    margin-top: 10px;
    padding: 10px;
    background-color: #FAD8FB;
    border: none;
    resize: none;
`
export const SaveButton = styled.div`
    width: 100px;
    height: 38px;
    cursor: pointer;
    border: 2px solid black;
    position: absolute;
    right: 50px;
    bottom: 70px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
`
export const DaysH2 = styled.h2`
    text-underline: ${(props) => props ? ('1px solid black') : ('none')};
`