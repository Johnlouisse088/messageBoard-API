import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function MessagesDelete() {

    const location = useLocation()
    const { message, messageId, roomName, roomId } = location.state || {}
    console.log('location: ', location)

    const navigate = useNavigate();

    async function handleRemoveSubmit(event) {
        event.preventDefault()
        try {
            const response = await fetch(`http://127.0.0.1:8000/messages/delete/${messageId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            if (response.ok) {
                console.log('successfully deleted');
                navigate(`/rooms/${roomId}`);
            } else {
                console.error("Can't delete");
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleRemoveSubmit}>
                <h1>Are you sure you want to delete '{message}'? </h1>
                <button type='submit'>Confirm</button>
            </form>

        </div>
    )
}

export default MessagesDelete
