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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast/use-toast";
import type { AddPropertyAPI } from "@/lib/definitons";
import { NewPropertySchema } from "@/lib/definitons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadScript } from "@react-google-maps/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getGeocode } from "use-places-autocomplete";
import { z } from "zod";
import AutoCompleteInput from "./auto-complete";

const formSchema = NewPropertySchema.extend({
  banner: z
    .instanceof(FileList)
    .refine((file) => file.length > 0, "No file selected.")
    .refine((file) => file.length == 1, "Only one file may be selected.")
    .refine((file) => {
      const fileSize = file.item(0)?.size;
      if (!fileSize) return false;
      return fileSize <= 1024 * 1024 * 4.5;
    }, "File is bigger than 4.5 MB"),
});
export type FormType = z.infer<typeof formSchema>;

export default function AddForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImageURL, setPreviewImageURL] = useState<string>(
    "https://static.vecteezy.com/system/resources/previews/000/378/951/original/home-vector-icon.jpg"
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_SECRET as string,
    libraries: ["places"],
  });

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      banner: undefined,
    },
  });

  const bannerRef = form.register("banner");

  async function onSubmit({ banner, ...values }: FormType) {
    const formData = new FormData();
    const requestData: AddPropertyAPI & { [key: string]: any } = {
      ...values,
      banner: banner[0],
    };
    for (let field in requestData) formData.append(field, requestData[field]);
    try {
      setIsLoading(true);
      const response = (await fetch("/api/property/add", {
        method: "POST",
        body: formData,
      })) as NextResponse;
      if (!response.ok) {
        if (response.status === 400) {
          const { errors, title, description } = await response.json();
          console.error(errors);
          return toast({
            title: title,
            description: description,
            variant: "destructive",
          });
        }
        throw new Error(
          `Got response ${response.status} when attempting to upload banner.`
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
    return toast({
      title: "File Uploaded",
      description: `File '${formData.get(
        "filename"
      )}' was successfully uploaded.`,
    });
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
      router.refresh();
    }
  }, [form.formState.isSubmitSuccessful, form, router]);

  return (
    <>
      {isLoaded ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a property title . . ."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a property description . . ."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <AutoCompleteInput
                      field={field}
                      onAddressSelect={(address) => {
                        getGeocode({ address: address }).then((results) => {
                          form.setValue("address", results[0].place_id);
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter the amount of bedrooms this property has . . ."
                      onChange={(event) => {
                        form.setValue("bedrooms", parseInt(event.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter the amount of bathrooms this property has . . ."
                      onChange={(event) => {
                        form.setValue(
                          "bathrooms",
                          parseInt(event.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="listing_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rent">To Let</SelectItem>
                        <SelectItem value="sell">For Sale</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter a property price . . ."
                      onChange={(event) => {
                        form.setValue("price", parseFloat(event.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg, .jpeg, .png, .webp, .bmp"
                      {...bannerRef}
                      onChange={(event) => {
                        field.onChange(event.target?.files?.[0] ?? undefined);
                        if (!event.target.files || !event.target.files[0]) {
                          return setPreviewImageURL(
                            "https://static.vecteezy.com/system/resources/previews/000/378/951/original/home-vector-icon.jpg"
                          );
                        }
                        const reader = new FileReader();
                        reader.onload = (ev: ProgressEvent<FileReader>) => {
                          if (!ev.target || !ev.target.result) {
                            setPreviewImageURL(
                              "https://static.vecteezy.com/system/resources/previews/000/378/951/original/home-vector-icon.jpg"
                            );
                          } else {
                            setPreviewImageURL(ev.target.result as string);
                          }
                        };
                        reader.readAsDataURL(event.target.files[0]);
                      }}
                    />
                  </FormControl>
                  <Image
                    src={previewImageURL}
                    alt="Image Preview"
                    width={300}
                    height={300}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full space-x-1">
              {isLoading ? (
                <>
                  <LoadingSVG />
                  <span>Adding property . . .</span>
                </>
              ) : (
                <>
                  <FaIcon icon="plus" />
                  <span>Add Property</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <>
          <LoadingSVG />
          <span>Loading . . .</span>
        </>
      )}
    </>
  );
}
