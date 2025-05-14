
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Create an Account</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
