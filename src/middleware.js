import { auth } from "@/auth";

export default auth((req) => {
  // Add custom logic if needed, otherwise this protects based on the matcher
});

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/profile/:path*", "/profile"],
};
