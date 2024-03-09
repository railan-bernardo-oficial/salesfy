'use client'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import logo from '../public/logo-salesfy.svg';
import logoIcon from '../public/icon-salesfy.svg';
import { FaArrowRight, FaRegEyeSlash } from 'react-icons/fa6';
import { showPassword } from './utils/utils';

type Inputs = {
  email: string,
  password: string
}

export default function Home() {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showEmaildInput, setShowEmailInput] = useState(false);
  const [saveEmail, setSaveEmail] = useState('');
  const [hidePassword, setHidePassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setSaveEmail(data.email)

    if(data.password.length > 0){
      console.log('DATA => ', data)
    }

  }

  const togglePasswordInput = () => {
    setShowPasswordInput(!showPasswordInput);
    setShowEmailInput(!showEmaildInput);
  };




  return (
    <div className="flex items-center justify-center h-screen">
      <div className="columns-sm">
        <div className='flex items-center justify-center py-14 gap-1'>
          <Image src={logoIcon} width={30} height={30} alt="SalesFy" />
          <Image src={logo} width={100} height={100} alt="SalesFy" />
        </div>
        <div className='p-6 rounded-2xl border border-b-slate-600/9'>
          <div className='flex items-center justify-center p-1 bg-slate-200 rounded-md'>
            <a href='' className='p-2 w-2/4 rounded bg-white text-zinc-700 text-center font-semibold'>Login</a>
            <a href='signup' className='p-2 w-2/4 rounded text-zinc-700 text-center font-semibold'>Nova Conta</a>
          </div>
          <p className='text-lg font-semibold text-zinc-800 py-8 text-center'>Acesse sua conta</p>
          <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <div className='w-full mb-6'>
                {!showPasswordInput && (
                <input 
                    className='w-full py-3 px-4 border border-b-slate-600/9 rounded-md text-base text-zinc-800 focus-visible:border-blue-600 focus:outline-none' 
                    type='email' 
                    {...register('email')} 
                    placeholder='Seu e-mail'
                    aria-label='Seu e-mail'
                     />
                )}
                {showEmaildInput && (
                <div className='w-full relative py-2 pl-4 pr-16 border  bg-slate-200/45 rounded-md text-base text-zinc-800'>
                   <span className='font-medium text-xs block'>E-mail</span>
                  {(saveEmail.length > 27 ? saveEmail.substring(0, 27) + '...' : saveEmail)}
                   <span className='text-base font-semibold cursor-pointer top-4 text-blue-500 absolute right-3' onClick={togglePasswordInput}>Trocar</span>
                </div>
                )}
              </div>
            {showPasswordInput && (
              <div className='w-full mb-6 relative'>
                <label className='font-normal text-base block mb-1'>Senha</label>
                <input
                  className='w-full py-3 pl-4 pr-10 border border-b-slate-600/9 rounded-md text-base text-zinc-800 focus-visible:border-blue-600 focus:outline-none'
                  type={!hidePassword ? 'password' : 'text'}
                  {...register('password')}
                  placeholder='Sua senha'
                  aria-label='Sua senha'
                />
                <FaRegEyeSlash 
                   onClick={() => showPassword(hidePassword, setHidePassword)}
                   className={`absolute right-3 bottom-4 text-xl cursor-pointer  ${!hidePassword ? 'text-zinc-400' : 'text-blue-600'}`}
                 />
              </div>
            )}
            {!showPasswordInput ? (
            <button 
                type='submit' 
                onClick={togglePasswordInput} 
                className='w-full flex items-center gap-2 justify-center rounded-lg p-3 bg-blue-500 hover:bg-blue-700 transition-all text-white font-semibold text-base'>
                  Próximo <FaArrowRight /> 
            </button>
            ) : 
            <button 
                type='submit'
                className='w-full flex items-center gap-2 justify-center rounded-lg p-3 bg-blue-500 hover:bg-blue-700 transition-all text-white font-semibold text-base'>
                  Acessar minha conta
            </button>
            }
          </form>
        </div>
      </div>
    </div>
  );
}
