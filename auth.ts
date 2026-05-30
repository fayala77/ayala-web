import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { allowedUsers } from '@/lib/users'
import { getMailchimpUser } from '@/lib/mailchimp'
import { verifyMagicToken } from '@/lib/magic-link'

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
      building?: string
      unit?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    building?: string
    unit?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Magic Link',
      credentials: { token: { type: 'text' } },
      async authorize(credentials) {
        const payload = verifyMagicToken(credentials?.token ?? '')
        if (!payload) return null

        const { email } = payload
        const admin = allowedUsers.find((u) => u.email === email)
        if (admin) return { id: email, email, name: admin.name }

        const mcUser = await getMailchimpUser(email)
        if (mcUser) return { id: email, email, name: mcUser.name }

        return null
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false
      if (allowedUsers.some((u) => u.email === user.email)) return true
      const mcUser = await getMailchimpUser(user.email)
      return mcUser !== null
    },
    async jwt({ token, user }) {
      // `user` is only present on the initial sign-in, not on subsequent requests.
      // This prevents both infinite Mailchimp retries and stale-token accumulation.
      if (user && token.email) {
        const admin = allowedUsers.find((u) => u.email === token.email)
        if (admin) {
          token.role = admin.role
          token.building = admin.building
          token.unit = admin.unit
        } else {
          const mcUser = await getMailchimpUser(token.email as string)
          if (mcUser) {
            token.role = mcUser.role
            token.building = mcUser.building
            token.unit = mcUser.unit
            token.name = mcUser.name
          }
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.building = token.building
        session.user.unit = token.unit
      }
      return session
    },
  },
  session: {
    maxAge: 60 * 24 * 60 * 60, // 60 días
    updateAge: 24 * 60 * 60,   // extiende el token una vez por día si hay actividad
  },
  pages: {
    signIn: '/login',
    error: '/acceso-denegado',
  },
}
