import React from 'react'
import todo from '../todo.png'
import '../Styles/Navbar.css';

const Navbar = () => {
    return (
        <header className='navbar'>
            <img className='todoLogo' src={todo} alt="todoLogo" />
            <nav>
                <ul>
                    <li><a className='nav-link nav-link-ltr' href='/'>Today's Todos</a></li>
                    <li><a className='nav-link nav-link-ltr' href='/priority'>Priority</a></li>
                    <li><a className='nav-link nav-link-ltr' href='/goals'>Goals</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar