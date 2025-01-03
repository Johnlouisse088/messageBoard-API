import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/Authentication';


function Room() {

    const { authTokens, accessTokenExpired } = useContext(AuthContext)

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
            const response = await fetch(`http://127.0.0.1:8000/api/rooms/${roomId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });
            if (response.ok) {
                const data = await response.json();
                setRoom(data.room);
                setMessages(data.messages);
            } else {
                accessTokenExpired()
            }


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
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access)
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
            <p>
                <Link to={`/rooms/delete/${room.id}`}>
                    Delete
                </Link>
                ||
                <Link
                    to={`/rooms/update/${room.id}`}
                    state={{ roomUpdate: room }}>
                    Update
                </Link>
            </p>
            <p>Room: {room.name ? room.name : "No room"}</p>
            <p>Topic: {room.topic ? room.topic.name : "No topic"}</p>
            <div>
                <h3>Messages:</h3>
                {messages.map((message) => (
                    <div key={message.id}>
                        <Link
                            to={`/messages/delete/${message.id}`}
                            state={{ 'roomName': room.name, 'roomId': room.id, 'messageId': message.id, 'message': message.message }}
                        >
                            {message.message} || {message.user.username}
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
