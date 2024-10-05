import React from 'react'
import { useState, useEffect } from 'react'

function Home() {

    const [rooms, setRooms] = useState([])
    const [topics, setTopics] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/`)
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
    console.log('message: ', messages)
    return (
        <>
            <section id='topics-section' className='topics-header'>
                <h3>Topics</h3>
                <ul>
                    {topics.map(topic => (
                        <li key={topic.id}>{topic.name}</li>
                    ))}
                </ul>
            </section>

            <section id='rooms-section' className='rooms-header'>
                <h3>Rooms</h3>
                <ul>
                    {rooms.map(room => (
                        <li key={room.id}>{room.room}</li>
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

        </>
    )
}

export default Home
