import React, { useEffect, useState } from 'react'

function Topics() {

    const [topics, setTopics] = useState([])
    const [searchedTopic, setSearchedTopic] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/topics/`)
                const data = await response.json()
                setTopics(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const handleTopicChange = (event) => {
        setSearchedTopic(event.target.value)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/topics/?searchedTopic=${searchedTopic}`)
            const data = await response.json()
            setTopics(data)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='searchedTopic'
                    placeholder='Enter the topic'
                    onChange={handleTopicChange}
                />
                <button type='submit'>Submit</button>
            </form>
            {topics.map((topic, index) => (
                <div key={index}>
                    {topic.name}
                    <span > {topic.roomCount}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default Topics
