import styled, {css, keyframes} from "styled-components";

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #E0EEFF;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const StartButton = styled.div`
    width: 180px;
    height: 75px;
    cursor: pointer;
    background-color: white;
    border: 5px solid #F09AF1;
    box-shadow: 5px 6px 0 #F09AF1;
    border-radius: 5em;
    font-size: 27px;
    font-weight: bold;
    color: #F09AF1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
    
    &:hover {
        background-color: #F09AF1;
        color: white;
        border: 5px solid white;
    }

    ${({ animate }) =>
            animate &&
            css`
      animation: ${bounce} 1.5s ease-in-out;
      animation-delay: 1s; /* 1초 지연 */
    `}
`

// 애니메이션 정의
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0); /* 원래 위치 */
  }
  50% {
    transform: translateY(-50px); /* 위로 튐 */
  }
`;

// BouncingDiv 컴포넌트
export const BouncingDiv = styled.div`
  ${({ animate }) =>
    animate &&
    css`
      animation: ${bounce} 1.5s ease-in-out;
    `}
`;
