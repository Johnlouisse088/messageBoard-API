import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Room() {
    const [room, setRoom] = useState({});
    const [messages, setMessages] = useState([]);

    // const [replyMessage, setReplyMessage] = useState("")

    const param = useParams();
    const roomId = parseInt(param.id);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/rooms/${roomId}/`);
                const data = await response.json();
                setRoom(data.room);
                setMessages(data.messages);

                console.log("data: ", data);

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [roomId]);

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
                    <div key={message.id}>{message.message}</div>
                ))}
                {/* <form>  CONTINUE....
                    <input    
                        type='text'
                        name='replyMessage'
                        onChange={handleChange}
                    />
                </form> */}
            </div>
        </>
    )
}

export default Room;
