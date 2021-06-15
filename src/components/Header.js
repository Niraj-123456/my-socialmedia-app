import React from 'react'
import '../Utils.css'

function Header() {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">
                    <p>Social Media App</p>
                    </a>
                    <div className="nav-icon d-flex">
                        <a className="icon mx-2" tabIndex="0" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Notifications" 
                        data-bs-content="And here's some amazing content. It's very engaging. Right?">
                            <i className="far fa-bell h5"></i>
                            <span className="badge-icon">1</span>
                        </a>
                        <a role="button" className="icon mx-2">
                            <i className="fab fa-facebook-messenger h5"></i>
                            <span className="badge-icon">1</span>
                        </a>
                        <a role="button" className="icon mx-2">
                            <i className="fas fa-user-friends h5"></i>
                            <span className="badge-icon">1</span>
                        </a>
                        <a role="button" className="icon mx-2">
                            <i className="fas fa-sign-out-alt"></i>   
                        </a> 
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
