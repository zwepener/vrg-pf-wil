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
import { type Libraries, useLoadScript } from "@react-google-maps/api";
import { ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import LoadingSVG from "./loading-svg";

interface Props {
  disabled?: boolean;
  initialValue?: string;
  onAddressSelect: (address: string) => void;
}

function AutoCompleteInput({
  disabled = false,
  initialValue,
  onAddressSelect,
}: Props) {
  const [displayValue, setDisplayValue] = useState<string>(
    initialValue ?? "Select an address . . ."
  );
  const [open, setOpen] = useState<boolean>(false);
  const {
    ready,
    suggestions: { status, data },
    setValue: setRequestValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "za" } },
    debounce: 300,
    cache: 86400,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {displayValue}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search address..."
            onValueChange={(value) => {
              setRequestValue(value);
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
                    onSelect={(value) => {
                      setOpen(false);
                      setDisplayValue(value);

                      setRequestValue(value, false);
                      clearSuggestions();

                      onAddressSelect?.(value);
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

export default function PlacesInput({
  disabled = false,
  onAddressSelect,
  initialValue,
}: Props) {
  const libraries = useMemo<Libraries>(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_SECRET as string,
    libraries: libraries,
  });

  if (!isLoaded)
    return (
      <Button
        variant="outline"
        disabled={true}
        className="w-[200px] justify-between"
      >
        <LoadingSVG />
        <span>Loading . . .</span>
      </Button>
    );

  return (
    <AutoCompleteInput
      disabled={disabled}
      onAddressSelect={onAddressSelect}
      initialValue={initialValue}
    />
  );
}
