"use client";

import { Button } from "@/components/ui/button";
import FaIcon from "@/components/ui/fa-icon";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingSVG from "@/components/ui/loading-svg";
import { useToast } from "@/components/ui/toast/use-toast";
import { RawUserSchema } from "@/lib/definitons";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formScheam = RawUserSchema.pick({
  username: true,
  password: true,
});
type LoginUser = z.infer<typeof formScheam>;

export default function LoginForm() {
  const { toast } = useToast();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  useEffect(() => {
    if (callbackUrl) {
      toast({
        title: "Login Required",
        description:
          "You need to be logged in to access the requested content.",
      });
    }
  }, []);

  const form = useForm<LoginUser>({
    resolver: zodResolver(formScheam),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onValidSubmit({ username, password }: LoginUser) {
    try {
      setIsLoading(true);

      const response = await signIn("credentials", {
        redirect: false,
        username: username.toLowerCase(),
        password: password,
      });

      if (!response) throw new Error("Got no response from the server.");

      if (response.status === 401)
        return toast({
          title: "Invalid Credentials",
          description: "Username or Password is incorrenct!",
          variant: "destructive",
        });

      if (!response.ok)
        throw new Error(
          response.error ??
            `Got response status ${response.status} when attempting to sign in.`
        );
    } catch (error) {
      console.error(error);
      return toast({
        title: "Something Went Wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
    toast({
      title: "Login Successfull",
      description: callbackUrl
        ? "Redirecting you back to your requested content."
        : "Redirecting you to the Home Page.",
    });
    router.push(callbackUrl ? callbackUrl : "/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit, (values) => {
          console.debug(values);
          toast({
            title: "Incomplete Form",
            description: "Please fill out all of the required fields.",
            variant: "destructive",
          });
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full space-x-1">
          {isLoading ? (
            <>
              <LoadingSVG />
              <span>Logging in . . .</span>
            </>
          ) : (
            <>
              <FaIcon icon="right-to-bracket" />
              <span>Log in</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
