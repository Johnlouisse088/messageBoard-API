import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/Authentication'

function Signup() {

    const { setImage } = useContext(AuthContext)

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

    const handleChange = (event) => {
        const { name, value } = event.target
        setUserForm(currentForm => {
            return { ...currentForm, [name]: value }
        })
    }
    const handleFileChange = (event) => {
        console.log("event: ", event)
        const file = event.target.files[0];
        setFile(file)
        console.log("URL.createObjectURL(file): ", URL.createObjectURL(file))
        setPreview(URL.createObjectURL(file)); // Preview the image
    };

    async function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData()
        Object.entries(userForm).forEach(([key, value]) => formData.append(key, value))  // way to iterate the object in JavaScript
        if (file) {
            formData.append('image', file)
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
