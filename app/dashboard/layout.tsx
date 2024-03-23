'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import OverlayPage from "../components/Overlay/OverlayPage";

export default function Dashboard({ 
   children
 }: {
   children: React.ReactNode
 })
{
const router = useRouter();
const { data: session, status: sessionStatus } = useSession();
const [visible, setVisible] = useState(true);

useEffect(()=> {
  if(sessionStatus === 'unauthenticated'){
    router.replace('/');
    return;
  }
  if(sessionStatus === 'authenticated'){
    setVisible(false)
  }
}, [sessionStatus, router, visible])

if(sessionStatus === 'loading' || sessionStatus === 'unauthenticated'){
  return (
     <div className='flex items-center justify-center h-screen'>
        <OverlayPage visible={visible} />
     </div>
  );
}

  return (
     <section>
      {children}
      </section>
  )
}