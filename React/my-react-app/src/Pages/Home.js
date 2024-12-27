import React from 'react'

import Navbar from './Navbar'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {

    const [rooms, setRooms] = useState([])
    const [topics, setTopics] = useState([])
    const [messages, setMessages] = useState([])

    const roomCount = Object.keys(rooms).length

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/`)
                const data = await response.json()

                setRooms(data.rooms)
                setTopics(data.topics)
                setMessages(data.messages)

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])


    return (
        <>
            <Navbar setRooms={setRooms} />
            <div id='home-sections'>
                <section id='topics-section' className='topics-header'>
                    <h3>Topics</h3>
                    <ul>
                        {topics.map(topic => (
                            <li key={topic.id}>{topic.name}</li>
                        ))}
                    </ul>

                    <Link to="/topics">
                        More Topics
                    </Link>

                </section>

                <section id='rooms-section' className='rooms-header'>
                    <div className='upper-room'>
                        <h3>STUDY ROOM</h3>
                        {roomCount} {roomCount <= 1 ? <p>room</p> : <p>rooms</p>}
                        <button><Link to="/rooms/create">Create Room</Link></button>
                    </div>

                    <ul>
                        {rooms.map(room => (
                            <li key={room.id}>
                                <Link to={`/rooms/${room.id}`}>
                                    {room.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <section id='messages-section' className='messages-header'>
                    <h3>Messages</h3>
                    <ul>
                        {messages.map(message => (
                            <li key={message.id}>{message.message}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    )
}

export default Home
