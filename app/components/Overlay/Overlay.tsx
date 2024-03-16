import Image from 'next/image';
import Spiner from '../../../public/spiner.gif';

type Css = {
  show: boolean,
  opacity: boolean
}

export default function  Overlay({show, opacity}: Css){

  return  (
     <div className={`absolute flex transition-all items-center justify-center h-full w-full z-10 bg-white/50 ${show == true ? 'block' : 'hidden'}`}>
         <Image src={Spiner} className={`transition-all ${opacity == true ? 'opacity-100' : 'opacity-0'}`} width="70" height="70" alt='spiner' />
     </div>
  )

}