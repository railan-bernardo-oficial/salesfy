import mongoose from "mongoose";

  const connect = async () =>{
   if(mongoose.connections[0].readyState) return;
   try{
   await mongoose.connect("mongodb://127.0.0.1/salesfy", {
     useNewUrlParser: true,
     useUniFiedTopology: true,
   });
    console.log('Conexão mongoose estabelecida!');
   } catch (err) {
    throw new Error('Erro ao se conectar com o mongoose');
   }
}

export default connect;