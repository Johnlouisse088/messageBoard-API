import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../Context/Authentication'

function RoomUpdate() {

    // Get the info from the http://localhost:3000/rooms/<id>
    const location = useLocation()
    const { roomUpdate } = location.state || {}

    // Get the id from the url
    const params = useParams()
    const roomId = parseInt(params.id)

    // States
    const { authTokens, topics } = useContext(AuthContext)
    const [roomUpdateRoom, setRoomUpdateRoom] = useState(roomUpdate)

    console.log('roomUpdate: ', roomUpdate)


    // navigate
    const navigate = useNavigate()

    async function updateData() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/rooms/update/${roomId}/`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify(roomUpdateRoom)
            })
            if (response.ok) {
                navigate('/')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setRoomUpdateRoom((currentForm) => {
            if ([name] == 'topic') {
                return { ...currentForm, [name]: { name: value } }
            } else {
                return { ...currentForm, [name]: value }
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        updateData()
    }


    return (
        <div>
            <h1>Update Room</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Room
                    <input
                        type="text"
                        name="name"
                        value={roomUpdateRoom.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Topic
                    <input
                        type="text"
                        name="topic"
                        list='topics-list'
                        value={roomUpdateRoom.topic?.name || ''}
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
                        value={roomUpdateRoom.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default RoomUpdate
