import {
    Comment1, CommentDelete,
    Comments,
    ContentsWrapper,
    NewComment,
    NewCommentInput,
    PostButton,
    PostContent,
    PostTitle
} from "./style";
import {Reset} from "styled-reset";
import TopBarComponent from "../../components/TopBarComponent";
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function PostDetail() {
    const { id } = useParams();

    const token = Cookies.get('authToken');
    const [decodedToken, setDecodedToken] = useState('');

    const navigate = useNavigate();
    const [newCommentValue, setNewCommentValue] = useState(""); // 새 댓글 내용
    const [comments, setComments] = useState([]); // 댓글 데이터 저장
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState(''); // 작성자 번호
    const [authorName, setAuthorName] = useState(''); // 작성자 이름



    // 게시물 수정 페이지로 이동
    const handleGoToEdit = (id) => {
        navigate(`/edit/${id}`, {
            state: { category: category, title: title, content: content }
        });
    };

    // 게시글 삭제
    const handleDeletePost = async () => {
        if (token) {
            try {
                await axios.delete(`/api/posts/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                });
                alert('게시물이 삭제되었습니다.');
                navigate('/community');
            } catch (error) {
                console.error('Failed to delete post', error);
            }
        }
        else {
            alert('로그아웃 상태입니다.');
        }
    }

    // 댓글 쓰기 핸들러
    const handleNewCommentInput = (e) => {
        setNewCommentValue(e.target.value);
    }

    // 댓글 제출
    const handleSubmitNewComment = async () => {
        if (token) {
            if (newCommentValue) {
                console.log('newCommentValue:',newCommentValue)

                try {
                    await axios.post(`/api/comments`, {
                        postId: id,
                        content: newCommentValue,
                        authorName: '우더니',
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': '*/*'
                        }
                    });
                    window.location.reload(); // 새로고침
                } catch (error) {
                    console.error('Failed to upload new comment', error);
                    console.error('Error details:', error.response?.data);
                }
            } else {
                alert("댓글 내용을 작성해 주세요.");
            }
        } else {
            alert("로그아웃 상태입니다.");
        }
    }

    // 댓글 삭제
    const handleDeleteComment = async (commentId) => {
        if (token) {
            try {
                await axios.delete(`/api/comments/${commentId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                });
                alert('댓글이 삭제되었습니다.');
                window.location.reload(); // 새로고침
            } catch (error) {
                console.error('Failed to delete post', error);
            }
        }
        else {
            alert('로그아웃 상태입니다.');
        }
    }

    // 게시물 가져오기
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`);
                console.log('디테일:',response.data);
                setTitle(response.data.title);
                setContent(response.data.content);
                setCategory(response.data.category);
                setAuthor(response.data.author);
                setAuthorName(response.data.authorName);
            } catch (error) {
                console.error('Failed to fetch detail', error);
            }
        };
        fetchDetail();
    }, [id]);

    // 댓글 가져오기
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/comments/post/${id}`);
                setComments(response.data); // 댓글 데이터 저장
                console.log('댓글:',response.data)
            } catch (error) {
                console.error('Failed to fetch contents', error);
            }
        };
        fetchComments();
    }, [id]);

    // token decode
    useEffect(() => {
        if (token) setDecodedToken(jwtDecode(token));
    }, [token]);

    return (
        <>
            <Reset/>
            <TopBarComponent/>
            <ContentsWrapper style={{width: '940px'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{width: '40px', height: 'auto', margin: '0 15px', backgroundColor: '#D7E8FF', padding: '10px', borderRadius: '100%'}}>
                        <img src='/images/man.png' alt='작성자 프로필 사진'
                             style={{width: '100%', height: '100%'}}
                        />
                    </div>
                    <div style={{fontSize: '17px', fontWeight: 'bold'}}>{authorName}</div>
                </div>
                <ContentsWrapper style={{
                    width: '800px',
                    border: '2px solid #D7E8FF',
                    borderRadius:'2em',
                    padding: '60px 70px 110px 70px',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.18)',
                    margin: '10px auto 50px auto'
                }}>
                    <PostTitle>{title}</PostTitle>
                    <hr style={{border: '2px solid #FFAE00', margin: '20px 0 40px 0'}}/>
                    <PostContent>{content}</PostContent>
                </ContentsWrapper>
                {`${decodedToken.id}` === `${author}` ? (
                    <div style={{width: 'max-content', margin: '30px 0 0 auto'}}>
                        <PostButton onClick={() => handleGoToEdit(id)}>수정하기</PostButton>
                        <PostButton onClick={handleDeletePost}>삭제하기</PostButton>
                    </div>
                ) : (<></>)}
                <p style={{fontSize: '25px', fontWeight: 'bold'}}>댓글</p>

                <Comments>
                    <NewComment>
                        <div style={{width: 'fit-content', fontSize: '17px', marginBottom: '1px'}}>{decodedToken.username} :</div>
                        <NewCommentInput
                            type="text"
                            value={newCommentValue}
                            onChange={handleNewCommentInput}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmitNewComment();
                                }
                            }}
                            placeholder='댓글을 작성해주세요.' />
                        {/* 댓글 제출 버튼 */}
                        <div onClick={handleSubmitNewComment} style={{marginLeft: 'auto', cursor: 'pointer'}}>
                            <svg width="30" height="30" viewBox="0 0 48 48" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4 4L33 11L36 26L26 36L11 33L4 4ZM4 4L19.172 19.172M24 38L38 24L44 30L30 44L24 38ZM26 22C26 24.2091 24.2091 26 22 26C19.7909 26 18 24.2091 18 22C18 19.7909 19.7909 18 22 18C24.2091 18 26 19.7909 26 22Z"
                                    stroke="#FFAE00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </NewComment>

                    {/*댓글 표시*/}
                    {comments ? (<>
                        {comments.map((comment, index) => (
                            <Comment1 key={index}>
                                <span style={{color: '#616161'}}>{comment.authorName} :&nbsp;</span>{comment.content}
                                {comment.authorName === decodedToken.username ? (
                                    <CommentDelete onClick={() => (handleDeleteComment(comment.id))}>삭제</CommentDelete>
                                ) : (<></>) }
                            </Comment1>
                        ))}
                    </>) : (<></>)}
                </Comments>
            </ContentsWrapper>

        </>

    );
}