import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: ''
    });

    const { email, password, name } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password, name };
            const response = await axios.post('http://localhost:5000/register', body);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setAuth(true);
                console.log('Registered successfully');
            }
        } catch (err) {
            console.error(err.message);
            alert(err.response?.data || 'Registration failed');
        }
    };

    return (
        <div className="container">
            <h1>회원가입</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="name"
                    placeholder="이름"
                    value={name}
                    onChange={onChange}
                    required
                />
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
                <button type="submit">가입하기</button>
            </form>
            <div className="link-text">
                이미 계정이 있으신가요? <Link to="/login">로그인</Link>
            </div>
        </div>
    );
};

export default Register;
