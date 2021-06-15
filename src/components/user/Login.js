import React, { useState } from 'react'
import { auth, provider } from '../../firebase'
import { useHistory } from 'react-router-dom'

function Login() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')

    const history = useHistory();


    const login = () => {
        auth.signInWithPopup(provider)
        .then((res) => {
            let user = res.user;
            setUserName(user.displayName);
            setEmail(user.email);
            setPhoto(user.photoURL);     
        }).catch((error) => {
            console.log(error.message);
        })
        history.push('/dashboard');
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <h5 className="card-header">Login</h5>
                        <div className="card-body d-grid col-6 mx-auto gap-2">
                            <a href="#" className="btn btn-primary" onClick={login}>Login with Google</a>
                            <a href="#" className="btn btn-secondary">Login with Email</a>
                            <a href="#" className="btn btn-light">Login with Apple</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
