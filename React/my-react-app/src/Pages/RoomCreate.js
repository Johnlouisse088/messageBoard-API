import React, { useEffect, useState } from 'react'

function RoomCreate() {

    const [error, setError] = useState("")
    const [topics, setTopics] = useState([])
    const [roomForm, setRoomForm] = useState({
        "room": "",
        "topic": "",
        "description": ""
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
            const response = await fetch(`http://127.0.0.1:8000/rooms/create/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(roomForm)
            })

            if (response.ok) {
                setRoomForm({
                    "room": "",
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
                const response = await fetch(`http://127.0.0.1:8000/topics`)
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
                        name="room"
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
