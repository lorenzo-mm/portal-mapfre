import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectMongo from '../../../database/conn'
import Users from '../../../model/Schema'
import { compare } from 'bcryptjs'
import { Result } from 'postcss'

export default NextAuth({
  providers: [

    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),

    // Github Provider
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),

    CredentialsProvider({
      name: 'Credentials',
      async authorize (credentials, req) {
        connectMongo().catch(error => { error: 'Connection Failed...!' })

        // check user existance
        const result = await Users.findOne({ email: credentials.email })
        if (!result) {
          throw new Error('No user Found with Email Please Sign Up...!')
        }

        // compare()
        const checkPassword = await compare(credentials.password, result.password)

        // incorrect password
        if (!checkPassword || Result.email !== credentials.email) {
          throw new Error("Username and/or Password doesn't match")
        }

        return result
      }
    })
  ],

  secret: process.env.JWT_SECRET
})
