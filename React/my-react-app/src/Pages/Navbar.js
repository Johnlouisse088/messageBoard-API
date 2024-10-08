import React from 'react'

import { useState } from 'react'

function Navbar({ setRooms }) {

    const [searchText, setSearchText] = useState("")

    const handleChange = (event) => {
        setSearchText(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:8000/?searchedRoom=${searchText}`)
                const data = await response.json()
                setRooms(data.rooms)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }
    return (
        <div className='navbar-header'>
            <div className='left-container'>
                <div>
                    {/* <img src='/' /> */}
                    <h1>Logo</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Search for the rooms ...'
                            name='searchedRoom'
                            onChange={handleChange}
                        />
                        <button type='submit' >Submit</button>
                    </form>
                </div>
            </div>
            <div className='right-container'>
                <div>
                    {/* profile picture */}
                    {/* username */}
                    {/* user email */}
                    {/* dropdown */}
                </div>
            </div>
        </div>
    )
}

export default Navbar
