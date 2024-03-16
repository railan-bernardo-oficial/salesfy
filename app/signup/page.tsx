'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import logo from '../../public/logo-salesfy.svg';
import logoIcon from '../../public/icon-salesfy.svg';
import { FaRegEyeSlash } from 'react-icons/fa6';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useState } from 'react';
import { showPassword, showConfirmPassword } from '../utils/utils';
import Overlay from '../components/Overlay/Overlay';
import Toasts from '../components/Toasts/Toasts';
import { toast } from 'react-toastify';
import useSWR from 'swr';

type Inputs = {
   name: string,
   email: string,
   phone: string,
   password: string,
   confirmPassword: string,
}


export default function Signup(){
  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
  const [overlay, setOverlay] = useState(false);
    const [phone, setPhone] = useState('');
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {

          setOverlay(!overlay);
          if(data.password !== data.confirmPassword){
              toast.warn("As senhas não conferem!", {
                position: "top-right"
              });
              setOverlay(false);
              return false;
          }
        
          handleInsert(data);
        
    }


    const handleInsert = async (data) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Outros headers, se necessário
          },
          body: JSON.stringify(data), // Corpo da requisição, no formato JSON
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const dataUser = await response.json();
        setOverlay(false);
        if(dataUser.status == 'success'){
          toast.success(dataUser.message, {
            position: "top-right"
          });
        }else if(dataUser.status == 'warning'){
          toast.warn(dataUser.message, {
            position: "top-right"
          });
        }
      } catch (error) {
        setOverlay(false);
        toast.error('Não foi possível cadastrar!', {
          position: "top-right"
        });
       
      }
    };


     return (
      <div className="flex items-center justify-center pt-32">
        <Toasts />
      <div className="columns-sm relative">
        <Overlay show={overlay} opacity={overlay} />
         <div className='flex items-center justify-center pb-14 gap-1'>
         <Image src={logoIcon} width={30} height={30} alt="SalesFy"/>
          <Image src={logo} width={100} height={100} alt="SalesFy"/>
         </div>
         <div className='p-6 rounded-2xl border border-b-slate-600/9 mb-12'>
             <div className='flex items-center justify-center p-1 bg-slate-200 rounded-md'>
                <a href='/' className='p-2 w-2/4 rounded text-zinc-700 text-center font-semibold'>Login</a>
                <a href='' className='p-2 w-2/4 rounded bg-white text-zinc-700 text-center font-semibold'>Nova Conta</a>
             </div>
             <p className='text-lg font-semibold text-zinc-800 py-8 text-center'>Nova conta</p>
             <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full mb-6'>
                  <input 
                  className='w-full py-3 px-4 border border-b-slate-600/9 rounded-md text-base text-zinc-800 focus-visible:border-blue-600 focus:outline-none' 
                  type='text' 
                  {...register('name')} 
                  placeholder='Nome e sobrenome' />
                </div>
                <div className='w-full mb-6'>
                  <input 
                  className='w-full py-3 px-4 border border-b-slate-600/9 rounded-md text-base text-zinc-800 focus-visible:border-blue-600 focus:outline-none' 
                  type='email' 
                  {...register('email')} 
                  placeholder='Seu e-mail' />
                </div>
                <div className='w-full mb-6'>
                  <PhoneInput
                  {...register('phone')}
                  international
                  defaultCountry='BR'
                  value={phone}
                  onChange={setPhone}
                  placeholder="Seu telefone"
                  className='w-full py-3 px-4 border border-b-slate-600/9 rounded-md text-base text-zinc-800 focus-visible:border-blue-600 focus:outline-none' 
                  />
                </div>
                <div className='w-full mb-6 relative'>
                  <input 
                  className='w-full py-3 pl-4 pr-10 border border-b-slate-600/9 rounded-md text-base text-zinc-800 focus-visible:border-blue-600 focus:outline-none' 
                  type={!hidePassword ? 'password' : 'text'} 
                  {...register('password')} 
                  placeholder='Senha' />
                  <FaRegEyeSlash 
                  onClick={()=> showPassword(hidePassword, setHidePassword)}
                  className={`absolute right-3 bottom-4 text-xl cursor-pointer  ${!hidePassword ? 'text-zinc-400' : 'text-blue-600'}`} />
                </div>
                <div className='w-full mb-6 relative'>
                  <input 
                  className='w-full py-3 pl-4 pr-10 border border-b-slate-600/9 rounded-md text-base text-zinc-800 focus-visible:border-blue-600 focus:outline-none' 
                  type={!hideConfirmPassword ? 'password' : 'text'}
                  {...register('confirmPassword')} 
                  placeholder='Repetir senha' />
                  <FaRegEyeSlash
                  onClick={()=> showConfirmPassword(hideConfirmPassword, setHideConfirmPassword)} 
                  className={`absolute right-3 bottom-4 text-xl cursor-pointer  ${!hideConfirmPassword ? 'text-zinc-400' : 'text-blue-600'}`} />
                </div>
                <div className='w-full text-center mb-6'>
                  <span className='text-xs w-full block'>Ao criar conta, você confirma que leu e </span>
                  <span className='text-xs w-full block'>concorda com os <a href='' className='text-blue-500'>termos de uso</a> da SalesFy. </span>
                </div>
                <button 
                type='submit' 
                className='w-full flex items-center gap-2 justify-center rounded-lg p-3 bg-blue-500 hover:bg-blue-700 transition-all text-white font-semibold text-base'
                >Criar conta grátis </button>
                
             </form>
         </div>
      </div>
  </div>
     );
}