import React, { useState } from 'react'

function Signup() {

    const [userForm, setUserForm] = useState({
        'username': '',
        'email': '',
        'password': ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setUserForm(currentForm => {
            return { ...currentForm, [name]: value }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/register/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userForm)
            })
            if (response.ok) {
                setUserForm({
                    'username': '',
                    'email': '',
                    'password': ''
                })
                console.log("created an account");
            } else {
                console.log("can't create an account");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username
                        <input
                            type='text'
                            name='username'
                            value={userForm.username}
                            placeholder='Username'
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email
                        <input
                            type='text'
                            name='email'
                            value={userForm.email}
                            placeholder='Email'
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input
                            type='password'
                            name='password'
                            value={userForm.password}
                            placeholder='Password'
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default Signup
