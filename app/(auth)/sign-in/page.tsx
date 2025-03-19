import AuthForm from "@/components/AuthForm";
import React from "react";

const SignIn = async () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type={"SIGN-IN"}></AuthForm>
    </section>
  );
};

export default SignIn;
