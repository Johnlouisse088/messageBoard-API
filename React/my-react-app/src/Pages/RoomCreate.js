import React, { useState } from 'react'

function RoomCreate() {

    const [roomForm, setRoomForm] = useState({
        "room": "",
        "description": "",
        "topic": 1,
        "user": 1
    })

    const handleChange = (event) => {
        setRoomForm((currentForm) => {
            const { name, value } = event.target
            return { ...currentForm, [name]: value }
        })
    }

    const handleCreateRoom = (event) => {
        event.preventDefault()
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/rooms/create/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(roomForm)
                })
                const data = await response.json()
                console.log("DATAA: ", data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }

    return (
        <form onSubmit={handleCreateRoom}>
            <div>
                <label>
                    Room name:
                    <input
                        type='text'
                        name='room'
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Room Description:
                    <input
                        type='text'
                        name='description'
                        onChange={handleChange}
                    />
                </label>
            </div>
            {/* <div>
                <label>
                    Topic:
                    <input
                        type='text'
                        name='topic'
                        onChange={handleChange}
                    />
                </label>
            </div> */}
            <button type='Submit'>Submit</button>
        </form>
    )
}

export default RoomCreate
