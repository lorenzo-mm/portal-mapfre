import Head from 'next/head'
import Link from 'next/link'
import { getSession, useSession, signOut } from 'next-auth/react'

import styles from '../styles/Home.module.css'

export default function Home () {
  const { data: session } = useSession()

  function handleSignOut () {
    signOut()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Portal Interno | MAPFRE</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {session ? User({ session, handleSignOut }) : Guest()}
    </div>
  )
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

// Autorizacion usuario
function User ({ session, handleSignOut }) {
  return (
    <main className='flex flex-col justify-center mx-auto text-center h-screen bg-red'>
      <div className='flex justify-center'>
        <h1 className={styles.principal_text}>Bienvenido al Portal de Mapfre</h1>
      </div>

      <div className='details'>
        <h3 className='text-white text-4xl font-bold'>As iniciado sesión con éxito</h3>
        <h3 className='text-gray text-3xl font-bold my-4'>{session.user.name}</h3>
      </div>

      <div className='my-8'>
        <div className='flex justify-center'>
          <Link href='/profile' className={styles.button}>Perfil</Link>
        </div>

        <div className='flex justify-center'>
          <button onClick={handleSignOut} className={styles.button}>Cerrar sesión</button>
        </div>
      </div>
    </main>

  )
}

export async function getServerSideProps ({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}
