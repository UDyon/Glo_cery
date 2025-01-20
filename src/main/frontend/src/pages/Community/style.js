import styled from "styled-components";

export const ContentsWrapper = styled.div`
    width: 1000px;
    height: auto;
    margin: 50px auto;
`
export const SearchWrapper = styled.div`
    width: 600px;
    height: 50px;
    margin: 30px auto;
    //background-color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
`
export const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 30px;
    border: 3px solid #29188f;
    padding: 0 20px;
    font-size: 16px;
`
export const SearchButton = styled.div`
    position: absolute;
    right: 0;
    margin-right: 20px;
    cursor: pointer;
`
export const Category = styled.div`
    border-radius: 2em;
    padding: 15px 20px;
    background-color: ${({ $isCategorySelected }) => ( $isCategorySelected === 1 ? '#FFAE00' : '#D7E8FF')};
    color: ${({ $isCategorySelected}) => ( $isCategorySelected === 1 ? 'white' : 'black')};
    display: inline-block;
    margin: 10px 10px 15px 0;
    cursor: pointer;
    user-select: none;
`
export const NewTitle = styled.input`
    font-size: 15px;
    display: inline-block;
    padding: 5px 13px;
    border: 2px solid #110078;
    border-radius: 2em;
    width: calc(100% - 30px);
    overflow: hidden;
    word-wrap: break-word;
    min-height: 40px;
    outline: none;
`
export const NewContent = styled.div`
    display: inline-block;
    padding: 13px;
    border: 2px solid #FFAE00;
    border-radius: 2em;
    width: calc(100% - 30px);
    overflow: hidden;
    word-wrap: break-word;
    min-height: 100px;
    outline: none;
    font-size: 15px;
    line-height: 1.5;
    margin: 20px 0;
    resize: none;
    /* Placeholder 스타일 */
    &:empty::before {
        content: attr(data-placeholder);
        color: #ccc;
        pointer-events: none; /* 클릭 시 placeholder는 무시됨 */
        position: absolute;
    }
`
export const SubmitButton = styled.div`
    padding: 15px 20px;
    color: white;
    background-color: #110078;
    border-radius: 2em;
    cursor: pointer;
    float: right;
`
export const PostTitle = styled.div`
    font-size: 30px;
    font-weight: bold;
    display: block;
    margin: 0 auto;
    text-align: center;
    line-height: 1.5;
`
export const PostContent = styled.div`
    width: 100%;
    height: auto;
    font-size: 20px;
    display: block;
    margin: 0 auto;
    text-align: center;
    line-height: 1.5;
`
export const PostButton = styled.div`
    background-color: #110078;
    border-radius: 2em;
    color: white;
    display: inline-block;
    padding: 15px 25px;
    margin-left: 20px;
    cursor: pointer;
    user-select: none;
    &:hover{
        background-color: #FFAE00;
        color: black;
    }
`
export const Comments = styled.div`
    width: calc(100% - 60px);
    height: auto;
    background-color: #D7E8FF;
    border-radius: 2em;
    margin-top: 20px;
    padding: 30px;
`
export const NewComment = styled.div`
    width: calc(100% - 30px);
    height: 50px;
    background-color: white;
    border-radius: 2em;
    display: flex;
    align-items: center;
    padding: 0 10px 0 20px;
    margin-bottom: 15px;
`
export const NewCommentInput = styled.input`
    height: 100%;
    width: calc(100% - 120px);
    padding: 0 10px;
    border: none;
    outline: none;
    font-size: 17px;
`
export const Comment1 = styled.div`
    padding: 10px 0;
    font-size: 17px;
    display: flex;
`
export const CommentDelete = styled.div`
    user-select: none;
    cursor: pointer;
    color: gray;
    font-size: 13px;
    border-bottom: 1px solid gray;
    margin: 2px 0 0 10px;
`
export const EditContent = styled.textarea`
    display: inline-block;
    padding: 13px;
    border: 2px solid #FFAE00;
    border-radius: 2em;
    width: calc(100% - 30px);
    overflow: hidden;
    word-wrap: break-word;
    min-height: 100px;
    outline: none;
    font-size: 15px;
    line-height: 1.5;
    margin: 20px 0;
    resize: none;
    font-family: sans-serif;
    
    /* Placeholder 스타일 */
    &:empty::before {
        content: attr(data-placeholder);
        color: #ccc;
        pointer-events: none; /* 클릭 시 placeholder는 무시됨 */
        position: absolute;
    }
`