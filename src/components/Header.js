import React, { useContext } from 'react'
import '../Utils.css'
import { AuthContext } from './../features/useAuth'
import { Link, useHistory } from 'react-router-dom'

function Header() {

    const { user, logOut } = useContext(AuthContext);
    const history = useHistory();
    console.log(user)
    const signOut = async () => {
        try{
            await logOut();
            history.push('/')
        } catch(error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">
                    <p>Social Media App</p>
                    </a>
                    <div className="nav-icon d-flex">
                        { user ? 
                        <>
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
                        <a role="button" className="icon mx-2" onClick={signOut}>
                            <i className="fas fa-sign-out-alt"></i>   
                        </a>
                        <p className="icon mx-2 text-uppercase">{user.displayName}</p>
                        </>
                        : 
                        <Link to="/login" role="botton" className="btn btn-light icon mx-2">Login</Link>
                        }
                         
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
