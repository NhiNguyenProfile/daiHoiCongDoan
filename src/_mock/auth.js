import { signInWithPopup } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth, googleProvider } from '../config/firebase'

function Auth() {
    useEffect(() => {
      
    }, [])
    

  const signUpWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (err) {
        console.log(err)
    }
  }
  return (
    <div>
        <button onClick={signUpWithGoogle}>Đăng nhập bằng Google</button>
    </div>
  )
}

export default Auth