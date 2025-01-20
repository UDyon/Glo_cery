import React, { useState } from 'react';

function Kakao() {
    const [message, setMessage] = useState(''); // 입력값 상태 관리

    /**
     * main 함수: 메시지 전송 로직
     */
    const main = async () => {
        const tokens = loadTokens();

        if (!tokens) {
            alert('토큰 파일이 없습니다. 인증 절차를 완료하세요.');
            return;
        }

        let accessToken = tokens.access_token;

        // 메시지 전송 시도
        let response = await sendKakaoMessage(accessToken, message);

        // 토큰 만료 시 갱신 및 재시도
        if (response.error) {
            console.log('토큰이 만료되었습니다. 갱신 중...');
            const newTokens = await refreshAccessToken(tokens.refresh_token);
            if (newTokens) {
                accessToken = newTokens.access_token;
                tokens.access_token = accessToken;
                if (newTokens.refresh_token) {
                    tokens.refresh_token = newTokens.refresh_token;
                }
                saveTokens(tokens);
                console.log('토큰 갱신 완료. 메시지 재전송 중...');
                response = await sendKakaoMessage(accessToken, message);
            } else {
                alert('토큰 갱신에 실패했습니다.');
                return;
            }
        }

        if (response.error) {
            alert(`메시지 전송 실패: ${response.error}`);
        } else {
            alert('메시지 전송 성공!');
        }
    };

    /**
     * 토큰 저장 함수
     */
    const saveTokens = (tokens) => {
        localStorage.setItem('kakao_tokens', JSON.stringify(tokens));
    };

    /**
     * 토큰 로드 함수
     */
    const loadTokens = () => {
        const tokens = localStorage.getItem('kakao_tokens');
        return tokens ? JSON.parse(tokens) : null;
    };

    /**
     * 액세스 토큰 갱신 함수
     */
    const refreshAccessToken = async (refreshToken) => {
        try {
            const url = `https://kauth.kakao.com/oauth/token`;

            const params = new URLSearchParams();
            params.append('grant_type', 'refresh_token');
            params.append('client_id', 'f8cf2b3f99df806a47c1443f809f6052');
            params.append('refresh_token', refreshToken);

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params,
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const newTokens = await response.json();
            return newTokens;
        } catch (error) {
            console.error('[Error] Failed to refresh Kakao token:', error);
            return null;
        }
    };

    /**
     * 카카오톡 메시지 전송 함수
     */
    const sendKakaoMessage = async (token, message) => {
        try {
            const url = 'https://kapi.kakao.com/v2/api/talk/memo/default/send';

            const templateObject = {
                object_type: 'text',
                text: message,
                link: {
                    web_url: 'https://localhost:3000',
                },
                button_title: '자세히 보기',
            };

            const formData = new URLSearchParams();
            formData.append('template_object', JSON.stringify(templateObject));

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('[Error] Kakao API Error:', errorText);
                return { error: errorText };
            }

            return await response.json();
        } catch (error) {
            console.error('[Error] Failed to send Kakao message:', error);
            return { error: error.message };
        }
    };

    return (
        <div>
            <h1>카카오톡 메시지 전송</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="보낼 메시지를 입력하세요"
            />
            <button onClick={main}>메시지 전송</button>
        </div>
    );
}

export default Kakao;
