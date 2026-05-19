import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { allowedUsers } from '@/lib/users'

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

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return allowedUsers.some((u) => u.email === user.email)
    },
    async session({ session }) {
      if (session.user?.email) {
        const userData = allowedUsers.find((u) => u.email === session.user.email)
        if (userData) {
          session.user.role = userData.role
          session.user.building = userData.building
          session.user.unit = userData.unit
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/acceso-denegado',
  },
}
