import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const InvoiceSchema = z.object({
  bankAccount: z.object({
    bankId: z.string().optional(),
    sortCode: z.string().regex(/^\d{2}-\d{2}-\d{2}$/, {
      message: "Sort code must be in the format 'XX-XX-XX' where X is a digit.",
    }),
    accountNumber: z
      .string()
      .min(8, "Account number must be at least 8 characters"),
    accountName: z.string().min(1, "Account name is required"),
  }),
  customer: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    contact: z.object({
      email: z.string().email("Invalid email"),
      mobileNumber: z.string().min(1, "Mobile number is required"),
    }),
    addresses: z
      .array(
        z.object({
          premise: z.string(),
          countryCode: z
            .string()
            .length(2, "Country code must be 2 characters"),
          postcode: z.string(),
          county: z.string(),
          city: z.string(),
          addressType: z.enum(["BILLING", "SHIPPING"]),
        })
      )
      .min(1, "At least one address is required"),
  }),
  documents: z.array(
    z.object({
      documentId: z.string(),
      documentName: z.string(),
      documentUrl: z.string().url("Invalid URL"),
    })
  ),
  invoiceReference: z.string(),
  invoiceNumber: z.string(),
  currency: z.string(),
  invoiceDate: z.string(),
  dueDate: z.string(),
  description: z.string(),
  customFields: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  extensions: z
    .array(
      z.object({
        addDeduct: z.enum(["ADD", "DEDUCT"]),
        value: z.number(),
        type: z.enum(["PERCENTAGE", "FIXED_VALUE"]),
        name: z.string(),
      })
    )
    .optional(),
  items: z
    .array(
      z.object({
        itemReference: z.string(),
        description: z.string(),
        quantity: z.number().positive("Quantity must be positive"),
        rate: z.number().positive("Rate must be positive"),
        itemName: z.string(),
        itemUOM: z.string(),
        customFields: z
          .array(
            z.object({
              key: z.string(),
              value: z.string(),
            })
          )
          .optional(),
        extensions: z
          .array(
            z.object({
              addDeduct: z.enum(["ADD", "DEDUCT"]),
              value: z.number(),
              type: z.enum(["PERCENTAGE", "FIXED_VALUE"]),
              name: z.string(),
            })
          )
          .optional(),
      })
    )
    .min(1, "At least one item is required"),
});

export type InvoiceFormData = z.infer<typeof InvoiceSchema>;
