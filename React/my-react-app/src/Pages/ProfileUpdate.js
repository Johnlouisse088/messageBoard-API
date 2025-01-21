import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { AuthContext } from '../Context/Authentication'

function ProfileUpdate() {

    // Context
    const { authTokens } = useContext(AuthContext)

    // Get the info of the user
    const location = useLocation()
    const { profileInfo } = location.state

    // Assigned the profileInfo in state
    const [userInfo, setUserInfo] = useState(profileInfo)

    // set image
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)

    // existing image
    const [myProfile, setMyProfile] = useState(null)

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

    // handle change for image
    const handleFileChange = (event) => {
        const file = event.target.files[0]
        console.log('file: ', file)
        setFile(file)
        setPreview(URL.createObjectURL(file))
    }

    // Handle submit
    async function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData()
        Object.entries(userInfo).forEach(([key, value]) => formData.append(key, value))
        if (file) {
            formData.append('image', file)
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/profile/update/${userInfo.id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: formData
            })
            if (response.ok) {
                navigate(`/profile/${profileId}`)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        console.log("image: ", userInfo.image)
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    id='username'
                    onChange={handleChange}
                    name='username'
                    value={userInfo.username}
                />
                <label htmlFor='name'>Name</label>
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
                <label>Image: </label>
                {preview
                    ? <img
                        src={preview}
                        alt="Preview"
                        style={{ width: '200px', marginTop: '10px' }} />
                    : <img
                        src={`http://127.0.0.1:8000/api${userInfo.image}`}
                        alt="Uploaded"
                        style={{ width: '200px', marginTop: '10px' }}
                    />}
                <input
                    name='image'
                    type='file'
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ProfileUpdate
