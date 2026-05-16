import Register from "@/sections/Register/Register";
import AuthLayout from "@/sections/AuthLayout/AuthLayout";

export const metadata = {
  title: "Sign Up | ZapShift",
  description: "Create a new ZapShift account.",
};

export default function SignUpPage() {
  return (
    <AuthLayout>
      <Register />
    </AuthLayout>
  );
}
