import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbarStyles.css';

class Navibar extends Component {
    state={clicked:false};
    handleClick=()=>{
        this.setState({clicked:!this.state.clicked});
    }
    render(){
    return (
        <>
        <nav>
            <a href='/'>
                <img src={require('../assets/images/logo192.png')} alt="Logo" style={{width: '30px', height: '30px'}} />
            </a>
            <div>
                <ul id='navbar' className={this.state.clicked? "#navbar active":"#navbar"}>
                    <li><a className={window.location.pathname === '/' ? 'active' : ''} href='/'>Home</a></li>
                    <li><a className={window.location.pathname === '/latest' ? 'active' : ''} href='/latest'>Latest</a></li>
                    <li><a className={window.location.pathname === '/schedule' ? 'active' : ''} href='/schedule'>Schedule</a></li>
                    <li><a className={window.location.pathname === '/teams' ? 'active' : ''} href='/teams'>Teams</a></li>
                    <li><a className={window.location.pathname === '/login' ? 'active' : ''} href='/login'>Login</a></li>
                    <li><a className={window.location.pathname === '/register' ? 'active' : ''} href='/register'>Register</a></li>
                </ul>
            </div>
            <div id="mobile" onClick={this.handleClick}>
                <i id="bar" className={this.state.clicked?'fas fa-times':'fas fa-bars'}></i>
            </div>
        </nav>
        </>
    );
    }
};

export { Navibar };
