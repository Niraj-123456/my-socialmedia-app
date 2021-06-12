import React from 'react'

function Header() {
    return (
        <div>
            <nav class="navbar navbar-light bg-light">
                <div class="container">
                    <a class="navbar-brand" href="#">
                    <p>Social Media App</p>
                    </a>
                    <div className="d-flex">
                        <i className="far fa-bell"></i>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
