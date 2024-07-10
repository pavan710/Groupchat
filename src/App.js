import logo from './logo.svg';
import './App.css';
import Login from './Login';
import { useState,useRef } from 'react';
import Cookies from 'universal-cookie';
import Chat from './Chat';
import {auth} from "./firebase-config"
import {signOut} from "firebase/auth"

const cookies=new Cookies();
function App() {
  const [isauth,setisauth]=useState(cookies.get("auth-token"))
  const [room,setroom] =useState(null);
  const [name,setname] =useState(null);
  const roomref=useRef();
  const nameref=useRef();
  const signoutuser=async()=>{
    await signOut(auth);
    cookies.remove("auth-token");
    setisauth(false);
    setroom(null);
  }
 
  return (
    <div className="App d-flex justify-content-center align-items-center">
    {!isauth ? (
      <Login setisauth={setisauth} />
    ) : (
      <div className='d-flex flex-column gap-4'>
        {room ? (
          <Chat room={room} name={name}/>
        ) : (
          <div className='p-5 d-flex flex-column justify-content-center align-items-center gap-3 bg-dark text-light  rounded'>
            <label className='h2'>Enter the room!</label>
            <input className='form-control' placeholder='Rom name' ref={roomref} type='text' />
            <input className='form-control' placeholder='Your name' ref={nameref} type='text' />
            <button className='btn btn-dark border' onClick={() => {setroom(roomref.current.value);setname(nameref.current.value)}}>Enter Room</button>
          </div>
        )}
        <button className='btn btn-danger' onClick={signoutuser}>Sign out</button>
      </div>
    )}
  </div>
  
  );
}

export default App;
