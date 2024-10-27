"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Path, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { InvoiceFormData } from "@/schemas";

interface CustomFormFieldProps {
  form: UseFormReturn<InvoiceFormData>;
  disabled?: boolean;
  name: Path<InvoiceFormData>;
  placeholder?: string;
  label?: string;
  className?: string;
  type?: string;
}

const CustomFormField = ({
  form,
  disabled,
  placeholder,
  name,
  label,
  className,
  type = "text",
}: CustomFormFieldProps) => {
  return (
    <div className={className}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => {
          let fieldValue;

          switch (typeof field.value) {
            case "string":
              fieldValue = field.value;
              break;
            case "number":
              fieldValue = Number(field.value);
              break;
            default:
              fieldValue = "";
              break;
          }

          return (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <Input
                  {...field}
                  value={fieldValue}
                  type={type}
                  disabled={disabled}
                  placeholder={placeholder ?? label}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export default CustomFormField;
