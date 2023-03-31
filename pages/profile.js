import { getSession, useSession, signOut } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/Perfile.module.css'

export default function Profile () {
  const { data: session } = useSession()

  function handleSignOut () {
    signOut()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Perfil</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {session ? Details({ session, handleSignOut }) : Guest()}
    </div>
  )
}

export const ImagePerfile = ({ session, width, maxWidth, ...rest }) => {
  const widths = {
    width: width ?? '100%',
    maxWidth: maxWidth ?? '100%'
  }

  if (session === 'authenticated') {
    return (
      <div className={styles.image_container} style={widths}>
        <Image width={500} height={500} className={styles.image_perfile} {...rest} src={session.user.image} alt='image profile' />
      </div>
    )
  }
}

// Guest
function Guest () {
  return (
    <main className='flex justify-center container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold '>Página de inicio de invitado</h3>

      <div className='flex justify-center'>
        <Link href='/login' className='mt-5 px-10 py-1 rounded-ms bg-red text-gray-50'> Accede Aquí</Link>
      </div>
    </main>
  )
}

function Details ({ session }) {
  return (
    <section className='flex justify-center mx-auto text-center h-screen bg-gray'>
      <div className='flex flex-col justify-center'>
        <div className='w-96 max-w-sm max-h-502 bg-white border-2 border-red rounded-xl'>
          <h3 className={styles.principal_text}>Perfil</h3>
          <div className='details flex flex-col justify-center'>
            <div className={styles.image_container}>
              <ImagePerfile />
            </div>
            <h3 className='text-4xl py-2 font-helvetica font-extralight'>{session.user.name}</h3>
            <h5 className='flex justify-center text-base py-1 font-sx font-helvetica font-normal'>{session.user.email}</h5>
          </div>
          <div className='flex justify-center py-6'>
            <Link href='/' className={styles.button}>Inicio</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps ({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        premanent: false
      }
    }
  }

  // authorize user return session
  return {
    props: { session }
  }
}
