import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css'
import { auth, provider } from '../firebase/firebase'
import { useStateValue } from '../providers/StateProvider'
import { actionTypes } from '../providers/Reducer';

function Login(props) {

    const [{ }, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then(
            result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            }
        ).catch(
            err => alert(err.message)
        )
    };
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://pngimg.com/uploads/whatsapp/whatsapp_PNG95147.png" alt="">
                </img>

                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>

        </div>
    );
}

export default Login;