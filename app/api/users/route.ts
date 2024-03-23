import User from "@/app/Models/User";
import connect from '@/app/utils/db'
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export const POST = async (request: any) =>{
   const { name, email, phone, password } = await request.json();

   await connect();

   const isEmail = await User.findOne({ email });

   if(isEmail){
      return new NextResponse('Email já existe!', { status: 400 })
   }

   const hashPassWD = await bcrypt.hash(password, 5);
   const newUser = new User({
      name,
      email,
      phone,
      password: hashPassWD
   });

   try {
      await newUser.save();
      return new NextResponse('Usuário cadastrado com sucesso!', { status:200 })
   } catch (err: any) {
     return new NextResponse(err,{ status: 500 })
   }
}