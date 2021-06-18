import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router';
import db from '../../firebase'
import { AuthContext } from '../../features/useAuth'

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const onEmailChanged = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChanged = (e) => {
        setPassword(e.target.value);
    }

    const { registerUserWithEmailAndPwd } = useContext(AuthContext);

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            await registerUserWithEmailAndPwd(email, password);
            history.push('/dashboard');
        } catch(error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-light">
                            Register
                        </div>
                        <div className="card-body">
                            <form onSubmit={registerUser}>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Email</label>
                                    <div className="col-sm-8">
                                        <input type="email" value={email} onChange={onEmailChanged} className="form-control" id="inputEmail3" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Password</label>
                                    <div className="col-sm-8">
                                        <input type="password" value={password} onChange={onPasswordChanged} className="form-control" id="inputPassword3" />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
