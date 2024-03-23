import NextAuth from "next-auth/next";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import User from "@/app/Models/User";
import connect from "@/app/utils/db";


export const authOptions: any = {
  secret: 'salesfy',
   providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "E-mail" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials: any) {
        await connect();

        try{
          const user = await User.findOne({ email: credentials.email });

          if(user){
            const isPassword = await bcrypt.compare(
              credentials.password,
              user.password
            );
  
            if(isPassword){
              return user;
            }
          }
        } catch (err: any) {
         
           throw new Error(err);
        }
      }
     }),
   ],
   callback: {
      async signIn({ user, account }: { user: AuthUser; account: Account }){
          if(account?.provider == 'credentials'){
             return true;
          }
      }
   }
}

export const handle = NextAuth(authOptions);
export { handle as GET, handle as POST };