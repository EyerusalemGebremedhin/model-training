"use client"
import client from '@/Lib/mqtt'
import { useState,useEffect } from 'react';
export default function Home() {
  const [message,SetMessage] = useState("")
  

  useEffect(() => {
    client.on("connect", () => {
      console.log("connected")
      client.subscribe("walu/gaming", (error) => {
        if(error) {
          console.log("Failed to subscribe")
        }
        else{
          console.log("Subscribed successfully")
        }
      })
    })
    client.on("message", (_topic, payload) => {
  SetMessage(payload.toString());
});

  }, [])

  
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1> SPYHIVE'S FIRST ESP32 PROJECT</h1>
       <p>{message}</p>
    </div> 
  );
}
