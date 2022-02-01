import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Join = () => {
    const [name, setName] = useState(null)
    const [room, setRoom] = useState(null)

    return (
        <div>
            <input placeholder='Name' type="text" onChange={(e) => setName(e.target.value)}/>
            <input placeholder='Room' type="text" onChange={(e) => setRoom(e.target.value)}/>

            <Link to={`/chat?name=${name}&room=${room}`}>
                <button>Sign In</button>
            </Link>
        </div>
    )
}

export default Join
