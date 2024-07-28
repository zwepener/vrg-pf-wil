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
import PlacesInput from "@/components/ui/places-autocomplete-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast/use-toast";
import { EditablePropertySchema, RawProperty } from "@/lib/definitons";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = EditablePropertySchema.omit({
  banner_url: true,
  images: true,
  featured: true,
  delisted: true,
});
type FormFields = z.infer<typeof formSchema>;

export default function EditForm({ property }: { property: RawProperty }) {
  const { toast } = useToast();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inEditMode, setInEditMode] = useState<boolean>(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agent_id: property.agent_id,
      title: property.title,
      description: property.description,
      listing_type: property.listing_type,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      address: property.address,
    },
  });

  async function onValidSubmit(values: FormFields) {
    if (!form.formState.isDirty) {
      return setInEditMode(false);
    }
    try {
      setInEditMode(false);
      setIsLoading(true);
      const response = await fetch("api/property/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
        }),
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
          `Got response ${response.status} when attempting to update property.`
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
    toast({
      title: "Property Updated",
      description: "The property has been successfully updated.",
    });
    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit, (values) => {
          console.debug(values);
          toast({
            title: "Incomplete Form",
            description:
              "Please make sure all of the required fields are properly filled out.",
            variant: "destructive",
          });
        })}
        className="space-y-8"
      >
        <FormField
          disabled={!inEditMode}
          control={form.control}
          name="agent_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter the new agent's id..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={!inEditMode}
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter the property's new title..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={!inEditMode}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter the property's new description..."
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
              <br />
              <FormControl>
                <PlacesInput
                  disabled={!inEditMode}
                  initialValue={field.value}
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
          name="listing_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listing Type</FormLabel>
              <FormControl>
                <Select
                  disabled={!inEditMode}
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
          disabled={!inEditMode}
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter new listing price..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={!inEditMode}
          control={form.control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bedrooms</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter new bedroom count..."
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
          disabled={!inEditMode}
          control={form.control}
          name="bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bathrooms</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter new bathroom count..."
                  onChange={(event) => {
                    form.setValue("bathrooms", parseInt(event.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex mb-5 space-x-2">
          <Button
            onClick={(event) => {
              event.preventDefault();
              if (form.formState.isDirty) form.reset();
              setInEditMode(false);
            }}
            className={cn("space-x-1", { hidden: !inEditMode })}
          >
            <FaIcon icon="xmark" />
            <span>Cancel</span>
          </Button>
          <Button
            disabled={isLoading}
            type="submit"
            onClick={(event) => {
              if (!inEditMode) {
                event.preventDefault();
                setInEditMode(true);
              }
            }}
            className="w-full space-x-1"
          >
            {isLoading ? (
              <>
                <LoadingSVG />
                <span>Saving Changes . . . </span>
              </>
            ) : inEditMode ? (
              <>
                <FaIcon icon="floppy-disk" />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <FaIcon icon="pen-to-square" />
                <span>Edit</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
