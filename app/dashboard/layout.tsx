"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import OverlayPage from "../components/Overlay/OverlayPage";
import { parseCookies } from "nookies";

export default function Dashboard({ 
   children
 }: {
   children: React.ReactNode
 })
 {  
  const router = useRouter();
  const { '@salesfy.token': token } = parseCookies();
  const [visible, setVisible] = useState(true)


  useEffect(()=>{
    if(!token){
       router.push('/');
    }else{
      setVisible(false);
      router.push('/dashboard');
    }
  },[token, visible])


  return (
    
     <section>
      <OverlayPage visible={visible} />
      {children}
      </section>
  )
}