import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.div`
    width: 800px;
    height: 400px;
    border-radius: 12px;
    border: 3px solid #110078;
    display: flex;

    @media (max-width: 768px) {
        width: 90%;
        height: auto;
        flex-direction: column;
    }
`;

export const InputInformation = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #d7e8ff;
    border-radius: 0 12px 12px 0;
    align-items: center;

    @media (max-width: 768px) {
        width: 100%;
        height: 280px;
        border-radius: 12px;
    }
`;

export const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: 50px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        width: 80%;
        margin-left: 0;
    }
`;

export const InputName = styled.div`
    font-family: NanumGothic;
    margin-bottom: 5px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

export const Input = styled.input`
    width: 80%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #d9d9d9;

    @media (max-width: 768px) {
        width: 100%;
        height: 35px;
    }
`;

export const Right = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const Logo = styled.img`
    width: 300px;

    @media (max-width: 768px) {
        width: 200px;
        display: none;
    }
`;

export const Logo2 = styled.img`
    display: none;

    @media (max-width: 768px) {
        display: block;
        width: 70%;
        border-radius: 12px;
        background-color: white;
        margin: 10px;
    }
`;
export const LoginBtn = styled.button`
    background-color: #110078;
    height: 45px;
    width: 70%;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    color: white;
    font-family: NanumGothic;
    transition: all 0.2s ease-in-out;
    margin-top: 10px;

    &:hover {
        background-color: #0a0045;
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        width: 80%;
    }
`;

export const Wrapper2 = styled.div`
    width: 800px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 12px;
    border: 3px solid #110078;
    padding: 30px;

    @media (max-width: 768px) {
        width: 90%;
        height: auto;
        padding: 20px;
    }
`;

export const Title = styled.div`
    width: 90%;
    text-align: left;
    font-size: 22px;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

export const AddProfileBtn = styled.button`
    width: 150px;
    height: 40px;
    background-color: #110078;
    color: white;
    border-radius: 30px;

    &:hover {
        background-color: #d7e8ff;
        color: black;
        border: 2px solid #ffae00;
    }

    @media (max-width: 768px) {
        width: 120px;
        height: 35px;
    }
`;

export const ProfileName = styled.div`
    margin-top: 10px;
    width: 100%;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

export const Profilediv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
`;

export const SaveProfileBtn = styled.button`
    width: 150px;
    height: 40px;
    background-color: #110078;
    color: white;
    border-radius: 30px;

    &:hover {
        background-color: #d7e8ff;
        color: black;
        border: 2px solid #ffae00;
    }

    @media (max-width: 768px) {
        width: 120px;
        height: 35px;
    }
`;

export const Input2 = styled.input`
    width: 60%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #d9d9d9;

    @media (max-width: 768px) {
        width: 80%;
    }
`;

export const GoSign = styled.div`
    font-size: 12px;
    color: gray;
    margin-top: 5px;
    cursor: pointer;

    a {
        &:hover {
            color: #ffae00;
        }
        margin-left: 5px;
    }

    @media (max-width: 768px) {
        font-size: 11px;
    }
`;
