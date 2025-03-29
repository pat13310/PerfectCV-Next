import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt';

// Définition du type User
export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: Date;
  updatedAt: Date;
  blocked: boolean;
  failedLoginAttempts: number;
}

// Type personnalisé pour la mise à jour de l'utilisateur
type UserUpdateData = Prisma.UserUpdateInput & {
  lastLogin?: Date;
  failedLoginAttempts?: number;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Log de débogage
      console.log('Redirect URL:', url);
      console.log('Base URL:', baseUrl);

      // Nettoie et normalise l'URL de redirection
      const cleanUrl = url.startsWith('/') 
        ? `${baseUrl}${url}` 
        : url || baseUrl;
      
      // Vérifie que l'URL de redirection est sûre et interne
      const safeUrl = cleanUrl.startsWith(baseUrl) 
        ? cleanUrl 
        : baseUrl;
      
      console.log('Safe URL:', safeUrl);
      return safeUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id || '';
        session.user.email = token.email || '';
        session.user.name = token.name || '';
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) {
        // Validation des entrées
        if (!credentials?.email || !credentials?.password) {
          console.error('Identifiants manquants');
          return null;
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.email)) {
          console.error('Format d\'email invalide');
          return null;
        }

        // Recherche de l'utilisateur
        const user = await prisma.user.findUnique({
          where: { 
            email: credentials.email.toLowerCase().trim() 
          }
        });

        // Vérification de l'existence de l'utilisateur
        if (!user) {
          console.error(`Utilisateur non trouvé : ${credentials.email}`);
          return null;
        }

        // Vérification du compte actif/bloqué
        if (user.blocked) {
          console.error('Compte bloqué');
          return null;
        }

        // Vérification du mot de passe
        const passwordMatch = await bcrypt.compare(
          credentials.password, 
          user.password
        );

        if (!passwordMatch) {
          // Gestion des tentatives de connexion échouées
          const failedAttempts = (user.failedLoginAttempts || 0) + 1;
          
          await prisma.user.update({
            where: { id: user.id },
            data: { 
              failedLoginAttempts: failedAttempts,
              // Bloquer le compte après 5 tentatives
              blocked: failedAttempts >= 5 
            }
          });

          console.error('Mot de passe incorrect');
          return null;
        }

        // Réinitialisation des tentatives en cas de succès
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            failedLoginAttempts: 0,
            lastLogin: new Date()
          } as UserUpdateData
        });

        // Retourner les informations de l'utilisateur sans le mot de passe
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          scope: "openid profile email"
        }
      }
    }),
  ]
};

// Fonction utilitaire pour hasher les mots de passe avec bcrypt
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}
