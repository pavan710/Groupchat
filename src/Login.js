import React from 'react'
import {auth,provider} from './firebase-config'
import {signInWithPopup} from 'firebase/auth'
import Cookies from 'universal-cookie';
import './App.css'
const cookies=new Cookies();
function Login({setisauth}) {
    const signwithgoogle=async()=>{
        try{
     const result=   await signInWithPopup(auth,provider );
     cookies.set("auth-token",result.user.refreshToken);
     setisauth(true);
        }
        catch(error){
            console.error(error);
        }

    };
  return (

    <div className='d-flex align-items-center gap-5 log'>
         <div className=' d-flex flex-column text-start justify-content-center align-items-center col-md-6  p-5 rounded col2'>
        <h1 className='text-light fs-1 '>React JS Realtime Group Chat App</h1>
        <p className='text-light'> Connect, communicate, and collaborate in real-time with our intuitive group chat application.</p>
        <button
            onClick={signwithgoogle}    >
            Signin with google
        </button>
        </div>
        <div className='col-md-6 d-flex justify-content-center'>
            <img src='people.jpg' height={440} width={550} className='rounded'/>
        </div>



       
    </div>
  )
}

export default Login