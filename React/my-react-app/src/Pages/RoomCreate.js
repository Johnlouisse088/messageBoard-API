import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/Authentication'
import { useNavigate } from 'react-router-dom'

function RoomCreate() {

    const { authTokens } = useContext(AuthContext)

    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [topics, setTopics] = useState([])
    const [roomForm, setRoomForm] = useState({
        "name": "",
        "topic": "",
        "description": "",
        "participants": []
    })

    const handleChange = (event) => {
        setRoomForm((currentForm) => {
            const { name, value } = event.target
            return { ...currentForm, [name]: value }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/rooms/create/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify(roomForm)
            })
            if (response.ok) {
                navigate('/')         // navigate the homepage after the room created
                setRoomForm({         // reset the form after the room created
                    "name": "",
                    "topic": "",
                    "description": ""
                })
            }
        } catch (error) {
            console.error(error)
            setError("Failed to create room!")
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/topics`)
                const data = await response.json()
                setTopics(data)
            } catch (error) {
                console.error(error)
                setError("Failed to load topics")
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Room
                    <input
                        type="text"
                        name="name"
                        value={roomForm.room}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Topic
                    <input
                        type="text"
                        name="topic"
                        list='topics-list'
                        value={roomForm.topic}
                        onChange={handleChange}
                    />
                    <datalist id="topics-list">
                        {topics.map((topic, index) => (
                            <option
                                key={index}
                                value={topic.name}
                            />
                        ))}
                    </datalist>
                </label>
                <label>
                    Description
                    <input
                        type="text"
                        name="description"
                        value={roomForm.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {error && <p>{error}</p>}
        </>
    )
}

export default RoomCreate
