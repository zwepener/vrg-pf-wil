"use client";

import { RawPropertySchema, type NewProperty } from "@/lib/definitons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { NextResponse } from "next/server";

const formSchema = RawPropertySchema.pick({
  title: true,
  description: true,
  listing_type: true,
  price: true,
  bedrooms: true,
  bathrooms: true,
  address: true,
  images: true,
});

export default function AddForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = (await fetch("/api/property/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })) as NextResponse;
    } catch (error) {
      console.error(error);
      return;
    }
  }
}
