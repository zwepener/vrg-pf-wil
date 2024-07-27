"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

export default async function AuthForm() {
  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              {"Enter your credentials here. Click 'Login' when you're done."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Suspense>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              {
                "Enter your details here. Click 'Create Account' when you're done."
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Suspense>
              <RegisterForm />
            </Suspense>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
