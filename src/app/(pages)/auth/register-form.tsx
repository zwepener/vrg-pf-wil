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
import { NewUserSchema, type NewUser } from "@/lib/definitons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = NewUserSchema.extend({
  confirmPass: z.string({ message: "Confirm Password is required." }),
}).refine(({ password, confirmPass }) => password === confirmPass, {
  message: "Passwords do not match!",
  path: ["confirmPass"],
});
type RegisterUser = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterUser>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPass: "",
    },
  });

  async function onSubmit({ username, ...values }: RegisterUser) {
    try {
      setIsLoading(true);
      const requestData = {
        ...values,
        username: username.toLowerCase(),
      } satisfies NewUser;
      const response = await fetch("api/user/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        if (response.status === 400) {
          const responseData = await response.json();
          console.error(responseData.errors);
          return toast({
            title: responseData.title,
            description: responseData.description,
            variant: "destructive",
          });
        }
        throw new Error(
          `Got response ${response.status} when attempting to create an account.`
        );
      }
    } catch (error) {
      console.error(error);
      return toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
    form.reset();
    toast({
      title: "Account Created",
      description:
        "Your new account was successfully created. You may now proceed to log in.",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (values) => {
          console.log(values);
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
        <FormField
          control={form.control}
          name="confirmPass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="Enter your firstname..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="Enter your lastname..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full space-x-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSVG />
              <span>Creating Account . . .</span>
            </>
          ) : (
            <>
              <FaIcon icon="user-plus" />
              <span>Create Account</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
