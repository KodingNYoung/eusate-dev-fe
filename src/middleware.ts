import { NextRequest, NextResponse } from "next/server"
import { ROUTES } from "./utils/constants"
import { getSession } from "./lib/sessions"

const PUBLIC_ROUTES: string[] = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.LOGIN_2FA,
  ROUTES.SIGN_UP,
  ROUTES.TWOFA_SETUP,
  ROUTES.TWOFA_METHOD,
  ROUTES.TWOFA_COMPLETED,
]

const middleware = async (request: NextRequest) => {
  // check if route is private route
  const path = request.nextUrl.pathname
  const isPrivateRoute = !PUBLIC_ROUTES.includes(path)

  // session
  const session = await getSession()

  // if route is protected && refresh token is invalid || token is not verified, redirect to login
  if (isPrivateRoute && (!session?.refreshToken || !session.tokenVerified)) {
    // TODO: This should redirect to the url for the session expired modal
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.nextUrl))
  }

  // if route is public && refresh token is available && token is valid, redirect to overview page
  if (!isPrivateRoute && session?.refreshToken && session.tokenVerified) {
    return NextResponse.redirect(new URL(ROUTES.OVERVIEW, request.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}

export default middleware
