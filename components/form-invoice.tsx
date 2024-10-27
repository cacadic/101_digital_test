"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { InvoiceFormData, InvoiceSchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import CustomFormField from "./custom-form-field";
import { sampleInvoiceData } from "@/dummy/invoice-sample";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { User } from "@/types/common";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function FormInvoice() {
  const [userData, setUserData] = useState<User>();

  const router = useRouter();

  const retrieveSession = useCallback(async () => {
    try {
      const sessionData = await getSession();
      const user = sessionData?.user as User;
      setUserData(user);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {},
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: InvoiceFormData) => {
    try {
      const accessToken = userData?.accessToken;
      const orgToken = userData?.profile.memberships[0].token;
      const endpoint = process.env.NEXT_PUBLIC_FETCH_INVOICES_API!;
      const body = {
        invoice: [data],
      };

      await axios.post(endpoint, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "org-token": orgToken,
          "Operation-Mode": "SYNC",
          "Content-Type": "application/json",
        },
      });

      toast.success("Invoice created successfully");

      router.push("/");
    } catch (error) {
      toast.error("Failed to create invoice");
      console.error(error);
    }
  };

  const handleAddSampleData = () => {
    form.reset({
      ...sampleInvoiceData,
    });
    form.trigger();
  };

  const handleClearForm = () => {
    form.reset(
      {
        bankAccount: {
          bankId: "",
        },
      },
      { keepErrors: false }
    );
  };

  useEffect(() => {
    retrieveSession();
  }, [retrieveSession]);

  if (!form) return null;

  return (
    <div className="w-full max-w-[1280px] pt-4 mx-auto pb-10 px-0 md:px-4 lg:px-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-4 sm:px-0"
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center flex-col sm:flex-row gap-2 sm:gap-0">
              <p className="font-bold text-xl sm:order-1 order-2 text-left w-full">
                Bank Account Information
              </p>
              <div className="flex gap-2 sm:order-2 order-1">
                <Button
                  variant="default"
                  type="button"
                  onClick={handleAddSampleData}
                >
                  Add Sample Data
                </Button>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={handleClearForm}
                >
                  Clear Form
                </Button>
              </div>
            </div>
            <div className="flex sm:flex-wrap flex-nowrap flex-col sm:flex-row justify-between gap-y-2 w-full">
              <CustomFormField
                form={form}
                name="bankAccount.bankId"
                label="Bank ID"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="bankAccount.sortCode"
                label="Sort Code"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="bankAccount.accountNumber"
                label="Account Number"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="bankAccount.accountName"
                label="Account Name"
                className="basis-[24%]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-xl">Customer Information</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between gap-y-2 w-full sm:flex-wrap flex-nowrap flex-col sm:flex-row">
                <CustomFormField
                  form={form}
                  name="customer.firstName"
                  label="First Name"
                  className="basis-[24%]"
                />
                <CustomFormField
                  form={form}
                  name="customer.lastName"
                  label="Last Name"
                  className="basis-[24%]"
                />
                <CustomFormField
                  form={form}
                  name="customer.contact.email"
                  label="Email"
                  className="basis-[24%]"
                />
                <CustomFormField
                  form={form}
                  name="customer.contact.mobileNumber"
                  label="Mobile Number"
                  className="basis-[24%]"
                />
              </div>

              <p className="font-bold">Customer Address Information</p>

              <div className="flex flex-wrap justify-between gap-y-2 w-full">
                <CustomFormField
                  form={form}
                  name="customer.addresses.0.premise"
                  label="Premise"
                />
                <CustomFormField
                  form={form}
                  name="customer.addresses.0.countryCode"
                  label="Country Code"
                />
                <CustomFormField
                  form={form}
                  name="customer.addresses.0.postcode"
                  label="Postcode"
                />
                <CustomFormField
                  form={form}
                  name="customer.addresses.0.county"
                  label="County"
                />
                <CustomFormField
                  form={form}
                  name="customer.addresses.0.city"
                  label="City"
                />
                <CustomFormField
                  form={form}
                  name="customer.addresses.0.addressType"
                  label="Address Type"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-xl">Document Information</p>
            <div className="flex justify-between gap-y-2 w-full sm:flex-wrap flex-nowrap flex-col sm:flex-row">
              <CustomFormField
                form={form}
                name="documents.0.documentId"
                label="Document ID"
                className="basis-[33%]"
              />
              <CustomFormField
                form={form}
                name="documents.0.documentName"
                label="Document Name"
                className="basis-[33%]"
              />
              <CustomFormField
                form={form}
                name="documents.0.documentUrl"
                label="Document URL"
                className="basis-[33%]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-xl">Invoice Information</p>
            <div className="flex flex-wrap justify-between gap-y-2 w-full">
              <CustomFormField
                form={form}
                name="invoiceReference"
                label="Invoice Reference"
              />
              <CustomFormField
                form={form}
                name="invoiceNumber"
                label="Invoice Number"
              />
              <CustomFormField form={form} name="currency" label="Currency" />
              <CustomFormField
                form={form}
                name="invoiceDate"
                label="Invoice Date"
              />
              <CustomFormField form={form} name="dueDate" label="Due Date" />
              <CustomFormField
                form={form}
                name="description"
                label="Description"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-xl">Custom Fields</p>
            <div className="flex flex-wrap justify-between gap-y-2 w-full">
              <CustomFormField
                form={form}
                name="customFields.0.key"
                label="Key"
                className="basis-[49%]"
              />
              <CustomFormField
                form={form}
                name="customFields.0.value"
                label="Value"
                className="basis-[49%]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-xl">Extensions</p>
            <div className="flex justify-between gap-y-2 w-full sm:flex-wrap flex-nowrap flex-col sm:flex-row">
              <CustomFormField
                form={form}
                name="extensions.0.addDeduct"
                label="Add Deduct"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="extensions.0.value"
                label="Value"
                type="number"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="extensions.0.type"
                label="Type"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="extensions.0.name"
                label="Name"
                className="basis-[24%]"
              />

              <CustomFormField
                form={form}
                name="extensions.1.addDeduct"
                label="Add Deduct 2"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="extensions.1.value"
                label="Value 2"
                type="number"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="extensions.1.type"
                label="Type 2"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="extensions.1.name"
                label="Name 2"
                className="basis-[24%]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-xl">Items</p>
            <div className="flex flex-wrap justify-between gap-y-2 w-full">
              <CustomFormField
                form={form}
                name="items.0.itemReference"
                label="Item Reference"
              />
              <CustomFormField
                form={form}
                name="items.0.description"
                label="Description"
              />
              <CustomFormField
                form={form}
                name="items.0.quantity"
                label="Quantity"
              />
              <CustomFormField form={form} name="items.0.rate" label="Rate" />
              <CustomFormField
                form={form}
                name="items.0.itemName"
                label="Item Name"
              />
              <CustomFormField
                form={form}
                name="items.0.itemUOM"
                label="Item UOM"
              />
            </div>

            <p className="font-bold">Item Custom Fields</p>
            <div className="flex flex-wrap justify-between gap-y-2 w-full">
              <CustomFormField
                form={form}
                name="items.0.customFields.0.key"
                label="Key"
                className="basis-[49%]"
              />
              <CustomFormField
                form={form}
                name="items.0.customFields.0.value"
                label="Value"
                className="basis-[49%]"
              />
            </div>

            <p className="font-bold">Item Extensions</p>
            <div className="flex justify-between gap-y-2 w-full sm:flex-wrap flex-nowrap flex-col sm:flex-row">
              <CustomFormField
                form={form}
                name="items.0.extensions.0.addDeduct"
                label="Add Deduct"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="items.0.extensions.0.value"
                label="Value"
                type="number"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="items.0.extensions.0.type"
                label="Type"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="items.0.extensions.0.name"
                label="Name"
                className="basis-[24%]"
              />

              <CustomFormField
                form={form}
                name="items.0.extensions.1.addDeduct"
                label="Add Deduct 2"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="items.0.extensions.1.value"
                label="Value 2"
                type="number"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="items.0.extensions.1.type"
                label="Type 2"
                className="basis-[24%]"
              />
              <CustomFormField
                form={form}
                name="items.0.extensions.1.name"
                label="Name 2"
                className="basis-[24%]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-2 mt-4">
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              className="w-full sm:w-auto"
            >
              Create Invoice
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
