import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './../Context/Authentication';
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

function Login() {
    const { setAuthTokens, setUserAccessToken, setUserRefreshToken } = useContext(AuthContext)
    const [loginForm, setLoginForm] = useState({ email: '', password: '' })

    const navigate = useNavigate()

    // Form
    const handleChange = (event) => {
        const { name, value } = event.target
        setLoginForm({ ...loginForm, [name]: value })
    }

    // Login
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/token/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginForm)
            })
            if (response.ok) {
                setLoginForm({ email: '', password: '' })
                const data = await response.json()
                setAuthTokens(data)
                setUserAccessToken(jwtDecode(data.access))
                setUserRefreshToken(data.refresh)
                localStorage.setItem('authTokens', JSON.stringify(data))
                navigate('/')
            } else {
                setLoginForm({ email: '', password: '' })
                alert("Invalid credentials")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div>
                Login
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email' >email</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        value={loginForm.email}
                        placeholder='email ...'
                        onChange={handleChange}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={loginForm.password}
                        placeholder='password ...'
                        onChange={handleChange}
                    />
                    <button type='submit'>Login</button>
                </form>
            </div>


            <div>
                <Link to='/Signup'>
                    <button>Create an account</button>
                </Link>
            </div>
        </>
    )
}

export default Login
