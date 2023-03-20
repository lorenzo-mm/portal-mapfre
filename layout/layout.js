import Styles from '../styles/Layout.module.css'
import Image from 'next/image'
import LogoMapfre from '../public/LogoMapfre.png'
import ImageAgency from '../public/ImageAgency.svg'


export default function Layout ({ children }) {
return (
  <>
    <div className='flex h-full bg-white'>
      <div className='m-auto bg-slate-50 w-full h-screen min-h-full grid lg:grid-cols-2'>
        <div className={Styles.imgStyle}>
          <div className={Styles.container_images}>
            <Image src={LogoMapfre} alt='' className={Styles.logo} />
            <Image src={ImageAgency} alt='' className={Styles.ImageAgency} />
          </div>
          <div className={Styles.container_text}>
            <h2>PORTAL INTERNO</h2>
          </div>
          <div className='flex justify-center absolute inset-x-0 bottom-0'>
            <div className='w-full mb-2'>
              <h5 className={Styles.color_footer}>
                MAPFRE © 2023 Todos los derechos reservados
              </h5>
            </div>
          </div>
        </div>
        <div className='right flex flex-col justify-center bg-red'>
          <div className='text-center'>
            {children}
          </div>
          <div>
            <div className='flex flex-col justify-center bottom-0 absolute mb-2 w-1/2'>
              <h5 className='text-center text-white'>
                  Si tiene algún problema para acceder, por favor, llame al teléfono
                <span className='ml-2 text-center text-sm'>
                  91 581 4900
                </span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
