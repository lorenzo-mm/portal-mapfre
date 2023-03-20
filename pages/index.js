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
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold '>Guest Homepage</h3>

      <div className='flex justify-center'>
        <Link href='/login'><a className='mt-5 px-10 py-1 rounded-sm bg-red text-gray-50'>Accede Aquí</a></Link>
      </div>
    </main>
  )
}

// Autorizacion usuario
function User ({ session, handleSignOut }) {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold '>Authorize User Homepage</h3>

      <div className='details'>
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className='flex justify-center'>
        <button onClick={handleSignOut} className='mt-5 px-10 py-1 rounded-sm bg-red border-gray-50'>Cerrar sesión</button>
      </div>

      <div className='flex justify-center'>
        <Link href='/perfil'><a className='mt-5 px-10 py-1 rounded-sm bg-red text-gray-500'>Perfil</a></Link>
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
