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
                        <i className="far fa-bell mx-3 h5"></i>
                        <i class="fab fa-facebook-messenger h5"><span class="badge rounded-pill bg-primary">1</span></i>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
