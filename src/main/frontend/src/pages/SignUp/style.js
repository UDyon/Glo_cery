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
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const InputInformation = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: #d7e8ff;
    border-radius: 12px 0 0 12px;

    @media (max-width: 768px) {
        width: 100%;
        height: 300px;
        border-radius: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;
    }
`;

export const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 40px;

    @media (max-width: 768px) {
        margin-left: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: left;
    }
`;

export const InputName = styled.div`
    font-family: NanumGothic;
    margin-bottom: 5px;

    @media (max-width: 768px) {
        font-size: 14px;
        width: 80%;
        text-align: left;
    }
`;

export const Input = styled.input`
    width: 80%;
    height: 25px;
    border-radius: 5px;
    border: 1px solid #d9d9d9;

    @media (max-width: 768px) {
        width: 80%;
        height: 35px;
    }
`;

export const Right = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
`;

export const Logo = styled.img`
    width: 250px;
    margin-top: 40px;

    @media (max-width: 768px) {
        display: none;
        width: 200px;
        margin-top: 20px;
    }
`;
export const Logo2 = styled.img`
    display: none;

    @media (max-width: 768px) {
        display: block;
        width: 80%;
        border-radius: 12px;
        background-color: white;
        margin: 10px;
    }
`;

export const SignupBtn = styled.button`
    background-color: #110078;
    height: 45px;
    width: 150px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    color: white;
    margin-top: -20px;
    font-family: NanumGothic;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #0a0045;
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 120px;
        margin-top: 0;
        height: 40px;
    }
`;

export const ProfileWrapper = styled.div`
    width: 60px;
    height: 60px;
    padding: 30px;
    background-color: ${({ isSelected }) =>
            isSelected ? "#FFAE00" : "#D7E8FF"};
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: ${({ isSelected }) =>
                isSelected ? "#FFAE00" : "#B0D4FF"};
    }

    @media (max-width: 768px) {
        width: 50px;
        height: 50px;
        padding: 20px;
    }
`;

export const ProfileImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;

export const ProfileContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    align-items: center;
    height: 60%;

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
        margin-top: 20px;
    }
`;

export const Title = styled.div`
    width: 90%;
    text-align: left;
    font-size: 22px;
    margin-top: 70px;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 18px;
        margin-top: 30px;
    }
`;

export const Wrapper2 = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;
