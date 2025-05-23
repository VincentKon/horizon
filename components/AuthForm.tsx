"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      //Sign ip with Appwrite & create plaid token
      if (type === "SIGN-UP") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };
        const newUser = await signUp(data);
        setUser(newUser);
      }
      if (type === "SIGN-IN") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        // console.log(response);
        // console.log("kosong");
        if (response) router.push("/");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className="cursor-pointer items-center gap-1">
          <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="Logo"
          ></Image>
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "SIGN-IN" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary"></PlaidLink>
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "SIGN-UP" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"firstName"}
                      label={"First Name"}
                      placeholder="Enter your first name"
                    ></CustomInput>
                    <CustomInput
                      control={form.control}
                      name={"lastName"}
                      label={"Last Name"}
                      placeholder="Enter your last name"
                    ></CustomInput>
                  </div>
                  <CustomInput
                    control={form.control}
                    name={"address1"}
                    label={"Address"}
                    placeholder="Enter your address"
                  ></CustomInput>
                  <CustomInput
                    control={form.control}
                    name={"city"}
                    label={"City"}
                    placeholder="Enter your city"
                  ></CustomInput>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"state"}
                      label={"State"}
                      placeholder="Example: NY"
                    ></CustomInput>
                    <CustomInput
                      control={form.control}
                      name={"postalCode"}
                      label={"Postal Code"}
                      placeholder="Example: 11101"
                    ></CustomInput>
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"dateOfBirth"}
                      label={"Date of Birth"}
                      placeholder="YYYY-MM-DD"
                    ></CustomInput>
                    <CustomInput
                      control={form.control}
                      name={"ssn"}
                      label={"SSN"}
                      placeholder="Example: 1234"
                    ></CustomInput>
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name={"email"}
                label={"Email"}
                placeholder="Enter your email"
              ></CustomInput>
              <CustomInput
                control={form.control}
                name={"password"}
                label={"Password"}
                placeholder="Enter your password"
              ></CustomInput>
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin"></Loader2>{" "}
                      &nbsp; Loading...
                    </>
                  ) : type === "SIGN-IN" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "SIGN-IN"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "SIGN-IN" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "SIGN-IN" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
