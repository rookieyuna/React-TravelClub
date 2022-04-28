import React, { Component } from 'react'
import { Link, NavLink } from "react-router-dom";

class Nav extends Component {
    render(){
        return (
            <nav className='navtop'>
                <h2>Travel Club</h2>
                <ul className='nav-links'>
                    <li><a href='#'>Main</a></li>
                    <li><a href='#'>Club</a></li>
                    <li><a href='#'>Member</a></li>
                </ul>
            </nav>
        )
    }
}

export default Nav;