import React from 'react'
import '../Utils.css'

function Header() {
    return (
        <div>
            <nav class="navbar navbar-light bg-light">
                <div class="container">
                    <a class="navbar-brand" href="#">
                    <p>Social Media App</p>
                    </a>
                    <div className="nav-icon d-flex">
                        <a href="#" className="icon mx-2">
                            <i className="far fa-bell h5"></i>
                            <span className="badge-icon">1</span>
                        </a>
                        <a href="#" className="icon mx-2">
                            <i className="fab fa-facebook-messenger h5"></i>
                            <span className="badge-icon">1</span>
                        </a>
                        <a href="#" className="icon mx-2">
                            <i className="fas fa-user-friends h5"></i>
                            <span className="badge-icon">1</span>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
