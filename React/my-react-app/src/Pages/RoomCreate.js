import React, { useEffect, useState } from 'react'

function RoomCreate() {

    const [topics, setTopics] = useState([]);
    const [roomForm, setRoomForm] = useState({
        "room": "",
        "description": "",
        "topic": "",
        "user": 1
    });

    const handleChange = (event) => {
        setRoomForm((currentForm) => {
            const { name, value } = event.target
            return { ...currentForm, [name]: value }
        });
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
                });
                // will reset roomFOrm if the submission is valid
                if (response.ok) {
                    console.log("reset room")
                    setRoomForm({
                        "room": "",
                        "description": "",
                        "topic": ""
                    });
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }

    useEffect(() => {
        async function fetchTopics() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/rooms/create/`);
                const data = await response.json();
                setTopics(data.topics);

            } catch (error) {
                console.error(error);
            }
        }
        fetchTopics()
    }, [])


    return (
        <form onSubmit={handleCreateRoom}>
            <div>
                <label>
                    Room name:
                    <input
                        type='text'
                        name='room'
                        value={roomForm.room}
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
                        value={roomForm.description}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Topic:
                    <input
                        type='text'
                        name='topic'
                        value={roomForm.topic}
                        list="topics"
                        onChange={handleChange}
                    />
                </label>
                <datalist id="topics">
                    {topics.map((topic) => {
                        return <option key={topic.id} value={topic.name} />
                    })}
                </datalist>
            </div>
            <button type='Submit'>Submit</button>
        </form>
    );
}

export default RoomCreate;
