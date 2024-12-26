import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'


function Room() {
    const [room, setRoom] = useState({});
    const [messages, setMessages] = useState([]);

    // Get the room id in url
    const param = useParams();
    const roomId = parseInt(param.id);

    const [replyMessageForm, setReplyMessageForm] = useState({
        'room': roomId,
        'message': ''
    });

    const handleChange = (event) => {
        setReplyMessageForm(currentMessageForm => {
            const { name, value } = event.target
            return { ...currentMessageForm, [name]: value }
        });
    }

    // For GET methodd
    async function fetchData() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/rooms/${roomId}/`);
            const data = await response.json();
            setRoom(data.room);
            setMessages(data.messages);

        } catch (error) {
            console.error(error);
        }
    }

    // useEffect
    useEffect(() => {
        fetchData();
    }, [roomId]);

    // For POST method
    const handleSubmitMessage = (event) => {
        event.preventDefault()
        async function sendMessage() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/rooms/${roomId}/`, {
                    'method': 'POST',
                    'headers': {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(replyMessageForm)
                });
                if (response.ok) {
                    setReplyMessageForm({
                        'room': roomId,
                        'message': ''
                    })
                    fetchData();
                }
            } catch (error) {
                console.error(error);
            }
        }
        sendMessage()
    }

    return (
        <>
            <p>{room.name ? room.description : "No description"}</p>
            <div>
                <h4>HOSTED BY</h4>
                <h4>@{room.user ? room.user.username : "No user"}</h4>
            </div>
            <p>{room.name ? room.name : "No room"}</p>
            <h1>{room.topic ? room.topic.name : "No topic"}</h1>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        <Link
                            to={`/messages/delete/${message.id}`}
                            state={{ 'roomName': room.name, 'roomId': room.id, 'messageId': message.id, 'message': message.message }}
                        >
                            {message.message}
                        </Link>
                    </div>
                ))}
                <form onSubmit={handleSubmitMessage}>
                    <input
                        type='text'
                        name='message'
                        value={replyMessageForm.message}
                        onChange={handleChange}
                    />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Room;
