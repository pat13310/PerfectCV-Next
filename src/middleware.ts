import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Constantes pour améliorer la maintenabilité
const AUTH_ROUTES = {
  PUBLIC: ['/login', '/register', '/'],
  PROTECTED: ['/dashboard', '/profile', '/cv'],
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ERROR: '/error'
}

// Fonction utilitaire pour la vérification des routes
function isRouteMatch(path: string, routes: string[]): boolean {
  return routes.some(route => 
    path === route || 
    path.startsWith(`${route}/`) ||
    path.startsWith(`${route}?`) ||
    // Gestion des routes dynamiques avec paramètres
    path.match(new RegExp(`^${route.replace(/\[.*?\]/g, '[^/]+')}(/|$)`))
  )
}

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
    const path = request.nextUrl.pathname

    // Vérification des routes protégées avec une logique plus robuste
    const isProtectedRoute = isRouteMatch(path, AUTH_ROUTES.PROTECTED)
    const isPublicRoute = isRouteMatch(path, AUTH_ROUTES.PUBLIC)

    // Gestion avancée des redirections
    if (!token) {
      // Redirection des utilisateurs non authentifiés depuis les routes protégées
      if (isProtectedRoute) {
        return NextResponse.redirect(
          new URL(`${AUTH_ROUTES.LOGIN}?redirectedFrom=${encodeURIComponent(path)}`, request.url)
        )
      }
    } else {
      // Redirection des utilisateurs authentifiés depuis les routes publiques d'authentification
      if (isRouteMatch(path, [AUTH_ROUTES.LOGIN, '/register'])) {
        return NextResponse.redirect(new URL(AUTH_ROUTES.DASHBOARD, request.url))
      }
    }

    // Journalisation légère (optionnel et configurable)
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Middleware] Access: ${path}, Authenticated: ${!!token}`)
    }

    return NextResponse.next()
  } catch (error) {
    // Gestion centralisée des erreurs avec plus de détails
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Middleware Error:', errorMessage)

    return NextResponse.redirect(
      new URL(`${AUTH_ROUTES.ERROR}?code=MIDDLEWARE_ERROR`, request.url)
    )
  }
}

// Configuration des routes à surveiller avec plus de flexibilité
export const config = {
  matcher: [
    // Routes protégées
    '/dashboard/:path*', 
    '/profile/:path*', 
    '/cv/:path*',
    
    // Routes d'authentification
    '/login',
    '/register',

    // Possibilité d'ajouter d'autres routes à surveiller
  ]
}