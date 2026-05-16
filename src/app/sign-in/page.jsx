import LogIn from "@/sections/Login/LogIn";
import AuthLayout from "@/sections/AuthLayout/AuthLayout";

export const metadata = {
  title: "Sign In | ZapShift",
  description: "Sign in to your ZapShift account.",
};

export default function SignInPage() {
  return (
    <AuthLayout>
      <LogIn />
    </AuthLayout>
  );
}
