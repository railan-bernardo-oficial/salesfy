'use client'
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { SignInProps, UserProps } from "../types/types";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { redirect } from "next/navigation";
import app from "../services/api";
import { useRouter } from "next/navigation";

interface AuthContextData {
   user: UserProps;
   setUser: (user: UserProps) =>void;
   isAuthenticated: boolean;
   signIn: (credentials: SignInProps) => Promise<void>;
   logoutUser: () => Promise <void>;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {

  console.log("ERORR LOGOUT");
  try {
    destroyCookie(null, '@barber.token', { path: '/' })
    redirect('/');

  } catch (err) {
    console.log("Error ao sair")
  }
}

type AuthProviderProps = {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter(); 
    const [user, setUser] = useState<UserProps>({name: '', email: ''});
    const isAuthenticated = !!user;
    const { '@salesfy.token': token } = parseCookies();

    useEffect(()=>{
      if(token){
        getMe();

        router.push('/dashboard')
      }
    }, [token])

    async function getMe() {
      if(token){
        const response = await app.get('app/users', {
           headers: {
             'Authorization': `Bearer ${token}`
           }
        })

        setUser({
          name: response.data.name,
          email: response.data.email
        })
        
      }else{
        console.log('Não autenticado');
      }
      return;
    }

    async function signIn({ email, password }: SignInProps){
           try{
            const response = await app.post('auth/login', {
              data: {
                email: email,
                password: password
              
              }
            })
               
                const { access_token, expires_in } = response.data;
  
                setCookie(undefined, '@salesfy.token', access_token, {
                  maxAge: expires_in,
                  path: '/'
                });
                
                await getMe();
                const delay = 2000; 
                setTimeout(redirectUser, delay);
  
             return;
           }catch(erro){
             console.log('erro', erro)
           }

    }

    function redirectUser(){
      router.push('/dashboard'); 
      return;
    };

    async function logoutUser() {
      try {
        destroyCookie(null, '@salesfy.token', { path: '/' })
        setUser({ name: '', email: '' });
        redirect('/')
      } catch (err) {
        console.log("ERRO AO SAIR", err)
      }
    }

    return (
      <AuthContext.Provider 
        value={{ 
            user, 
            setUser, 
            isAuthenticated,
            signIn,
            logoutUser 
        }}>
         {children}
      </AuthContext.Provider>
    );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}