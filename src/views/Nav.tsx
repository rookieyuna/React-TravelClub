import React, { Component } from 'react'
import { Link, NavLink } from "react-router-dom";

class Nav extends Component {
    render(){
        return (
            <nav className='navtop'>
                <Link to='/' className='title'><h2>Travel Club</h2></Link>
                <ul className='nav-links'>
                    <li><NavLink to='/'>Club</NavLink></li>
                    <li><NavLink to='/member'>Member</NavLink></li>
                    <li><NavLink to='/board'>Board</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default Nav;