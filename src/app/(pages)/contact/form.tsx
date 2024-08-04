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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  message: z.string(),
});
type FormFields = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { toast } = useToast();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  async function onValidSubmit(values: FormFields) {
    try {
      setIsLoading(true);
      const response = await fetch("api/inquiry/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
          `Got response ${response.status} when attempting to create an inquiry.`
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
        "Your inquiry was successfully submitted. We will get back to you as soon as possible.",
    });
    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit, (values) => {
          console.log(values);
          toast({
            title: "Incomplete Form",
            description: "Please fill out all of the required fields.",
            variant: "destructive",
          });
        })}
        className="space-y-8 mb-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter your email..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter your inquiry..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full space-x-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSVG />
              <span>Submitting Inquiry . . .</span>
            </>
          ) : (
            <>
              <FaIcon icon="plus" />
              <span>Submit Inquiry</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
