import React, { useContext, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/Authentication'

function Signup() {

    const [userForm, setUserForm] = useState({
        'username': '',
        'email': '',
        'bio': '',
        'password': ''
    })

    // states - image setup
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null)

    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setUserForm(currentForm => {
            return { ...currentForm, [name]: value }
        })
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("file: ", file)
        setFile(file)
        setPreview(URL.createObjectURL(file)); // Preview the image
    };

    async function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData()
        Object.entries(userForm).forEach(([key, value]) => formData.append(key, value))  // way to iterate the object in JavaScript
        if (file) {
            formData.append('image', file)
        } else { // During the user creation, if user didn't put an image. It will default to a specified image
            // conversion  of image to file format
            const defaultImage = 'http://127.0.0.1:8000/api/media/profile_pictures/default_image.jpg'   // endpoint
            const response = await fetch(defaultImage)          // fetch method
            const blob = await response.blob()                  // after it fetch, it converts to blob
            const defaultFile = new File([blob], "default-image.png", { type: blob.type });  // conversion to file format
            formData.append('image', defaultFile)
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/register/`, {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                // reset the form
                setUserForm({
                    'username': '',
                    'email': '',
                    'bio': '',
                    'password': ''
                })
                setFile(null)
                setPreview(null)
                console.log("created an account");

            } else {
                alert("can't create an account")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>

            {/* Preview the selected image */}
            {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
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
                        Bio
                        <input
                            type='text'
                            name='bio'
                            value={userForm.bio}
                            placeholder='Optional'
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
                <div>
                    <label>Image: </label>
                    <input
                        name='image'
                        type='file'
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <button type='submit'>Create</button>
                <Link to='/login'>
                    <button type='submit'>Already have an account</button>
                </Link>

            </form>
        </div>
    )
}

export default Signup
