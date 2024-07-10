import React, { useEffect, useState } from 'react'
import {addDoc,collection,serverTimestamp,onSnapshot,where,orderBy, query}from 'firebase/firestore'
import {auth, db } from './firebase-config';

import './App.css'
function Chat({room,name}) {
    const[newMessage,setnewMessage]=useState("");
    const messageref=collection(db,"messages");
    const [message,setMessages]=useState([]);
    useEffect(()=>{
        const querymsg=query(messageref,where("room","==",room),orderBy('createdAt'));
       const unscribe= onSnapshot(querymsg, (snapshot)=>{
            let msg=[];
            snapshot.forEach( (doc)=>{
                msg.push({...doc.data(),id:doc.id});
            });
            
            setMessages(msg);
           
        });

        return ()=>unscribe();
    },[]);






    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(newMessage==="")return;
        await addDoc(messageref,{
            text:newMessage,
            createdAt:serverTimestamp(),
            user:name,
            room:room
        });
        setnewMessage("");

    }
  return (
    <div className='d-flex flex-wrap flex-column chat gap-3 bg-dark rounded border p-3' >
    <div className='bg-dark  p-4 text-light'>
      <h2 >Welcome to {room}</h2>
      <hr/>
    </div>
    <div>
      <div className='text-dark' >
        {message.length==0? (<p  className='text-light'>Start chatting now!</p>):
        (message.map((item,ind)=>(
            <div className='d-flex flex-row align-items-center '>
            <p className='name text-light'>{item.user}:</p>
            <p key={ind} className='name text-light '>{item.text}</p>
           
            </div>
        )))}
      </div>
      <form className='d-flex justify-content-center align-items-center gap-3' 
            onSubmit={handleSubmit}>

      <input className='form-control'   
             type='text' 
             placeholder='Type your message here....' 
             onChange={(e)=>setnewMessage(e.target.value)} 
             value={newMessage}/>

      <button className='btn btn-dark border' 
              type='submit'>Send</button>
      </form>

    </div>
    
   </div>
  )
}

export default Chat