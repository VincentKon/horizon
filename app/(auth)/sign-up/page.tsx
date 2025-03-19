import AuthForm from "@/components/AuthForm";
import React from "react";

const SignUp = async () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type={"SIGN-UP"}></AuthForm>
    </section>
  );
};

export default SignUp;
