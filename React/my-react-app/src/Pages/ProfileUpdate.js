import React, { useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { AuthContext } from '../Context/Authentication'

function ProfileUpdate() {

    // Context
    const { authTokens } = useContext(AuthContext)

    // Get the info of the user
    const location = useLocation()
    const { profileInfo } = location.state || {}

    // Assigned the profileInfo in state
    const [userInfo, setUserInfo] = useState(profileInfo)

    // Navigate
    const navigate = useNavigate()

    // Params
    const params = useParams()
    const profileId = parseInt(params.id)

    // Handle Change
    const handleChange = (event) => {
        const { name, value } = event.target
        setUserInfo(currentForm => { return { ...currentForm, [name]: value } })
    }

    // Handle submit
    async function handleSubmit(event) {

        event.preventDefault()
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/profile/update/${userInfo.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify(userInfo)
            })
            if (response.ok) {
                navigate(`/profile/${profileId}`)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Username</label>
                <input
                    type='text'
                    id='name'
                    onChange={handleChange}
                    name='name'
                    value={userInfo.name}
                />
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    id='email'
                    onChange={handleChange}
                    name='email'
                    value={userInfo.email}
                />
                <label htmlFor='bio'>Bio</label>
                <input
                    type='text'
                    id='bio'
                    onChange={handleChange}
                    name='bio'
                    value={userInfo.bio}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ProfileUpdate
