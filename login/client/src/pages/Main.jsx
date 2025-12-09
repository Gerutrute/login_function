import React, { useState, useEffect } from 'react';

const Main = ({ setAuth }) => {
    const [name, setName] = useState('');

    async function getName() {
        try {
            const response = await fetch('http://localhost:5000/verify', { // In a real app, you'd have a specific profile endpoint
                method: 'GET',
                headers: { token: localStorage.getItem('token') }
            });

            // Since /verify only returns true/false in our simple backend, 
            // we might want to decode the token or fetch user details.
            // For now, let's just show a welcome message.
            setName("사용자");
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setAuth(false);
    };

    useEffect(() => {
        getName();
    }, []);

    return (
        <div className="container dashboard">
            <h1>메인 페이지</h1>
            <h2>환영합니다, {name}님!</h2>
            <p>성공적으로 로그인하셨습니다.</p>
            <button onClick={e => logout(e)} style={{ marginTop: '2rem', background: '#ef4444' }}>
                로그아웃
            </button>
        </div>
    );
};

export default Main;
