"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import usePlacesAutoComplete from "use-places-autocomplete";
import type { FormType } from "./form";

interface AutoCompleteInputProps {
  onAddressSelect: (address: string) => void;
  field: ControllerRenderProps<FormType, "address">;
}
export default function AutoCompleteInput({
  onAddressSelect,
  field,
}: AutoCompleteInputProps) {
  const [open, setOpen] = useState(false);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: { componentRestrictions: { country: "za" } },
    debounce: 300,
    cache: 86400,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : "Select an address..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search address..."
            onValueChange={(value) => {
              setValue(value);
            }}
          />
          <CommandList>
            <CommandEmpty>No addresses found.</CommandEmpty>
            <CommandGroup>
              {ready &&
                status === "OK" &&
                data.map(({ place_id, description }) => (
                  <CommandItem
                    key={place_id}
                    value={description}
                    onSelect={(currentValue) => {
                      setValue(currentValue, false);
                      setOpen(false);
                      clearSuggestions();
                      onAddressSelect && onAddressSelect(currentValue);
                    }}
                  >
                    {description}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
