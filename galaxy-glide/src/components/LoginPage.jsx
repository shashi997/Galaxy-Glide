import React from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import { googleAuth } from '../api/auth'
import { useNavigate} from 'react-router-dom'

function LoginPage() {
    const navigate = useNavigate()

    const responseGoogle = async (authResult) => {
        try {
            console.log(authResult['code']);
            
            if(authResult['code']) {
                const result = await googleAuth(authResult['code'])
                console.log(result.data);
                
                const {email, name, image} = result.data.user 
                const token = result.data.token

                const obj = {email, name, image, token}
                localStorage.setItem('user-info', JSON.stringify(obj))
                console.log(`result.data.user : `, result.data.user);
                console.log(token);
                navigate('/')

            }
            
        } catch (error) {
            console.error("Error while requesting the google code : ", error);
            
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })

  return (
    <div>
        <h2>LoginPage</h2>
        <button onClick={googleLogin}>Login With Google</button>
    </div>
  )
}

export default LoginPage