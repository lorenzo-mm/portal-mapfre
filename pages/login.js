import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { useFormik } from 'formik'
import loginValidate from '../lib/validate'

import Link from 'next/link'
import Head from 'next/head'
import Layout from '../layout/layout'
import Styles from '../styles/Form.module.css'
import { MailOutlined, LockOutlined } from '@ant-design/icons'

export default function Login () {
  const [show, setShow] = useState(false)

  const router = useRouter()

  // formik hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: loginValidate,
    onSubmit
  })

  async function onSubmit (values) {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/'
    })

    if (status.ok)router.push(status.url)
  }

  // Google Handler function
  async function handleGoogleSingin () {
    signIn('google', { callbackUrl: 'http://localhost:3000' })
  }

  //  Github Hanlder function
  async function handleGithubSingin () {
    signIn('github', { callbackUrl: 'http://localhost:3000' })
  }

  return (
    <Layout>

      <Head>
        <title>Iniciar sesión</title>
      </Head>

      <section className='w-3/4 mx-auto flex flex-col'>
        <div className='title'>
          <h1 className='text-white text-4xl font-500 py-6'>Inicio de sesión</h1>

          {/* Form */}
          <div className='flex justify-center '>
            <form className='flex flex-col gap-5 w-96' onSubmit={formik.handleSubmit}>
              <div className={`${Styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-slate-900' : ''}`}>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  {...formik.getFieldProps('email')}
                  className={Styles.input_text}
                />
                <div className='absolute top-0 flex items-center justify-center h-full right-4'>
                  <MailOutlined className='text-2xl text-white' />
                </div>
              </div>

              <div className={`${Styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-slate-900' : ''}`}>
                <input
                  type={`${show ? 'text' : 'password'}`}
                  name='password'
                  placeholder='Contraseña'
                  {...formik.getFieldProps('password')}
                  className={Styles.input_text}
                />
                <div className='absolute top-0 flex items-center justify-center h-full right-4'>
                  <LockOutlined className='text-2xl text-white' onClick={() => setShow(!show)} />
                </div>
              </div>

              {/* Login buttons */}
              <div className='input_button'>
                <button type='submit' className={Styles.button}>
                  Iniciar sesión
                </button>
              </div>
              <div className='input_button'>
                <button type='button' onClick={handleGoogleSingin} className={Styles.button_custom}>
                  Iniciar sesión con Google
                </button>
              </div>
              <div className='input_button'>
                <button type='button' onClick={handleGithubSingin} className={Styles.button_custom}>
                  Iniciar sesión con Github
                </button>
              </div>
            </form>
          </div>

          {/* bottom */}
          <p className='text-center text-white p-4'>
            ¿No tienes cuenta? <Link href='/register' className='text-blue-700'> Regístrate</Link>
          </p>
        </div>
      </section>
    </Layout>
  )
}
