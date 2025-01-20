import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 100px);
`;

export const Container = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    width: 90%;
    margin-top: 40px;
    border-radius: 8px;

    @media (max-width: 768px) {
        flex-direction: column; 
        width: 100%;
        margin-top: 20px; 
    }
`;

export const LeftSection = styled.div`
    flex: 1.2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-left: 100px;
    padding: 2px;

    @media (max-width: 768px) {
        margin-left: 0; 
        margin-bottom: 20px;
        width: 100%; 
    }
`;

export const RightSection = styled.div`
    flex: 2;
    display: flex;
    margin-left: 100px;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2px;

    @media (max-width: 768px) {
        margin-left: 10px; 
        width: 100%; 
    }
`;

export const BodyDiagramContainer = styled.div`
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    background-color: #fff;
    padding: 1px;

    @media (max-width: 768px) {
        width: 70%;
    }
`;