import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await axios.post('http://localhost:5000/login', body);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setAuth(true);
                console.log('Logged in successfully');
            } else {
                setAuth(false);
                alert('Login failed');
            }
        } catch (err) {
            console.error(err.message);
            alert(err.response?.data || 'Login failed');
        }
    };

    return (
        <div className="container">
            <h1>로그인</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={onChange}
                    required
                />
                <button type="submit">로그인</button>
            </form>
            <div className="link-text">
                계정이 없으신가요? <Link to="/register">회원가입</Link>
            </div>
        </div>
    );
};

export default Login;
