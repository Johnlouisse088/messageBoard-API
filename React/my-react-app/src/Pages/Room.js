import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Room() {
    const [room, setRoom] = useState({})
    const [messages, setMessages] = useState([])
    const [participants, setParticipants] = useState([])

    const param = useParams();
    const roomId = parseInt(param.id);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/rooms/${roomId}/`)
                const data = await response.json()
                setRoom(data.rooms)
                setMessages(data.messages)
                setParticipants(data.participants)

            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [roomId]);
    console.log("id: ", roomId)
    console.log("room: ", room)
    console.log("messages: ", messages)
    console.log("participants: ", participants)

    return (
        <>

        </>
    )
}

export default Room
