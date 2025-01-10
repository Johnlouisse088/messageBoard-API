import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/Authentication'
import { Link, useParams } from 'react-router-dom';

function Profile() {

    // context
    const { authTokens, userAccessToken } = useContext(AuthContext)

    // states
    const [userInfo, setUserInfo] = useState({})
    const [rooms, setRooms] = useState([])

    // params
    const params = useParams()
    const profileId = parseInt(params.id)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/profile/${profileId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + String(authTokens.access)
                    }
                })
                const data = await response.json()
                setUserInfo(data.user_info)
                setRooms(data.user_room)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {userInfo?.username || 'No username'}</p>
            <p>Email: {userInfo?.email || 'No email'} </p>
            <p>Description: {userInfo?.bio || 'No description'} </p>

            {userAccessToken.name === userInfo.username ? (
                <Link
                    to={`/profile/update/${userInfo.id}`}
                    state={{ profileInfo: userInfo }}>
                    <h4>Update Profile</h4>
                </Link>
            ) : null}


            <h2>Rooms hosted by {userInfo.username}</h2>
            <ul>
                {rooms.map(room => {
                    return <li key={room.id}>{room.name}</li>
                })}
            </ul>
        </div>
    )
}

export default Profile
