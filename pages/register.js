import { useState } from 'react'
import { useFormik } from 'formik'
import { registerValidate } from '../lib/validate'
import { useRouter } from 'next/router'

import Head from 'next/head'
import Link from 'next/link'
import Layout from '../layout/layout'
import Styles from '../styles/Form.module.css'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'

export default function Register () {
  const [show, setShow] = useState({ password: false, cpassword: false })

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: ''
    },
    validate: registerValidate,
    onSubmit
  })

  async function onSubmit (values) {
    const options = {
      method: 'POST',
      Headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    }

    await fetch('http://localhost:3000/api/auth/signup', options)
      .then(res => res.json())
      .then((data) => {
        if (data)router.push('http://localhost:3000')
      })
  }

  return (
    <Layout>

      <Head>
        <title>Regístrate</title>
      </Head>

      <section className='w-3/4 mx-auto flex flex-col'>
        <div className='title'>
          <h1 className='text-white text-4xl font-500 py-6'>Crear cuenta</h1>

          {/* Form */}
          <div className='flex justify-center '>
            <form className='flex flex-col gap-5 w-96' onSubmit={formik.handleSubmit}>
              <div className={`${Styles.input_group} ${formik.errors.username && formik.touched.username ? <span className='border-rose-600'>{formik.errors.username}</span> : <></>}`}>
                <input
                  type='text'
                  name='Username'
                  placeholder='Usuario'
                  {...formik.getFieldProps('username')}
                  className={Styles.input_text}
                />
                <div className='absolute top-0 flex items-center justify-center h-full right-4'>
                  <UserOutlined className='text-2xl text-white' />
                </div>
              </div>

              <div className={`${Styles.input_group} ${formik.errors.email && formik.touched.email ? <span className='border-rose-600'>{formik.errors.email}</span> : <></>}`}>
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
              <div className={`${Styles.input_group} ${formik.errors.password && formik.touched.password ? <span className='border-rose-600'>{formik.errors.password}</span> : <></>}`}>
                <input
                  type={`${show.password ? 'text' : 'password'}`}
                  name='password'
                  placeholder='Contraseña'
                  {...formik.getFieldProps('password')}
                  className={Styles.input_text}
                />
                <div className='absolute top-0 flex items-center justify-center h-full right-4'>
                  <LockOutlined className='text-2xl text-white' onClick={() => setShow({ ...show, password: !show.password })} />
                </div>
              </div>

              <div className={`${Styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword ? <span className='border-rose-600'>{formik.errors.cpassword}</span> : <></>}`}>
                <input
                  type={`${show.cpassword ? 'text' : 'password'}`}
                  name='cpassword'
                  placeholder='Confirmar Contraseña'
                  {...formik.getFieldProps('cpassword')}
                  className={Styles.input_text}
                />
                <div className='absolute top-0 flex items-center justify-center h-full right-4'>
                  <LockOutlined className='text-2xl text-white' onClick={() => setShow({ ...show, cpassword: !show.cpassword })} />
                </div>
              </div>

              {/* Login buttons */}
              <div className='input_button'>
                <button type='submit' className={Styles.button}>
                  Regístrese
                </button>
              </div>
            </form>
          </div>

          {/* bottom */}
          <p className='text-center text-white p-4'>
            ¿Ya tienes una cuenta? <Link href='/login' className='text-blue-600'>Accede Aquí</Link>
          </p>
        </div>
      </section>
    </Layout>
  )
}
