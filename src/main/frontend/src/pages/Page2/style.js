// style.js
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    font-family: Arial, sans-serif;
`;

export const LeftPanel = styled.div`
    flex: 1;
    background-color: #f5aef5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
`;

export const RightPanel = styled.div`
    flex: 2;
    background-color: #fff;
    position: relative;
    padding: 20px;
`;

export const Section = styled.div`
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
`;

export const LeftItemList = styled.div`
    margin: 20px 0;
`;

export const LeftItem = styled.div`
    font-size: 36px;
    margin: 10px 0;
    display: flex;
    align-items: center;
`;

export const RightItemList = styled.div`
    margin: 20px 0;
`;

export const RightItem = styled.div`
    font-size: 40px; /* 오른쪽 글씨 크기 더 큼 */
    margin: 12px 0;
    display: flex;
    align-items: center;
`;

export const SendButton = styled.button`
    padding: 10px 20px;
    width: 100%;
    background-color: #f5aef5;
    color: black;
    font-size: 32px;
    cursor: pointer;

    &:hover {
        background-color: #ff7dff;
    }
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: black;
    margin: 15px 0;
`;

export const SvgBackground = styled.div`
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1151 971" fill="none"><rect width="1151" height="962" fill="%23FAD8FB"/><rect x="1007" y="818" width="144" height="153" fill="white"/><path d="M1007 818H1151L1007 962V818Z" fill="%23E5C8E6"/></svg>') no-repeat center;
    background-size: contain;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    ${(props) => (props.left ? 'left: 10px;' : 'right: 10px;')}
    transform: translateY(-50%);
    background: transparent;
    border: none;
    font-size: 48px;
    cursor: pointer;
`;
