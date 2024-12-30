import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../Context/Authentication'

function RoomDelete() {

    const { authTokens } = useContext(AuthContext)

    const params = useParams()
    const roomId = params.id

    const navigate = useNavigate()


    async function handleDeleteButton() {
        try {
            fetch(`http://127.0.0.1:8000/api/rooms/delete/${roomId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            })
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <span>Are you sure you want to delete?</span>
            <button onClick={handleDeleteButton}>Delete</button>
        </div>
    )
}

export default RoomDelete
