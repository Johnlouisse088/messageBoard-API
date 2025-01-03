import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/Authentication'
import { useNavigate } from 'react-router-dom'

function RoomCreate() {

    const { roomForm, handleChange, handleSubmit, topics, fetchTopic, error } = useContext(AuthContext)

    useEffect(() => {
        fetchTopic()
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Room
                    <input
                        type="text"
                        name="name"
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
