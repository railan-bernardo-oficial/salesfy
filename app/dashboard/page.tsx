'use client'
import { signOut } from "next-auth/react"

export default function Dash(){

    return (
      <div>
          <h1>Dashboard</h1>
          <button onClick={()=> signOut({ callbackUrl: 'http://localhost:3000' })}>Sair</button>
      </div>
    )
}