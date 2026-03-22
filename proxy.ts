import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    // signIn: "/"
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/((?!login|register|api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
