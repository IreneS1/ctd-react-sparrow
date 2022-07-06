import React from 'react'

const Navbar = () => {
    return (
        <div className='navbar'>
            {/* Today's todo,  priority, goals, */}
            <a href='/home'>Overview</a>
            <a href='/priority'>Priority</a>
            <a href='/goals'>Goals</a>
        </div>
    )
}

export default Navbar