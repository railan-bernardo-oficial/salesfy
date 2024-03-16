import Image from 'next/image';
import Spiner from '../../../public/spiner.gif';

type OverlayStyle = {
    visible: boolean
}

export default function  OverlayPage({ visible }: OverlayStyle){

  return  (
     <div className={`absolute flex transition-all items-center justify-center h-full w-full z-10 bg-white ${visible == true ? 'block' : 'hidden'}`}>
         <Image src={Spiner} className="transition-all opacity-100" width="70" height="70" alt='spiner' />
     </div>
  )

}