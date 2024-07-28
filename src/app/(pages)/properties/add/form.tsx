"use client";

import PropertyBanner from "@/assets/images/property-banner.png";
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
import PlacesInput from "@/components/ui/places-autocomplete-input";
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
import Image from "next/image";
import type { NextResponse } from "next/server";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = NewPropertySchema.extend({
  banner_img: z
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
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      banner_img: undefined,
    },
  });

  const bannerRef = form.register("banner_img");

  async function onSubmit({ banner_img, ...values }: FormType) {
    const formData = new FormData();
    const requestData: AddPropertyAPI & { [key: string]: any } = {
      ...values,
      banner_img: banner_img[0],
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
    form.reset();
    toast({
      title: "Property Added",
      description: "A new property was successfully added.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a property title . . ." {...field} />
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
                <PlacesInput
                  onAddressSelect={(address) => {
                    form.setValue("address", address);
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
                    form.setValue("bathrooms", parseInt(event.target.value));
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
          name="banner_img"
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
                      return setPreviewImageURL(null);
                    }
                    const reader = new FileReader();
                    reader.onload = (ev: ProgressEvent<FileReader>) => {
                      if (!ev.target || !ev.target.result) {
                        setPreviewImageURL(null);
                      } else {
                        setPreviewImageURL(ev.target.result as string);
                      }
                    };
                    reader.readAsDataURL(event.target.files[0]);
                  }}
                />
              </FormControl>
              <Image
                src={previewImageURL ?? PropertyBanner}
                alt="Image Preview"
                width={300}
                height={300}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full space-x-1">
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
  );
}
