import { InvoiceFormData } from "@/schemas";

export const sampleInvoiceData: InvoiceFormData = {
  bankAccount: {
    bankId: "",
    sortCode: "09-01-01",
    accountNumber: "12345678",
    accountName: "John Terry",
  },
  customer: {
    firstName: "Linh",
    lastName: "Pham",
    contact: {
      email: "phamviethonglinh@gmail.com",
      mobileNumber: "+84366286668",
    },
    addresses: [
      {
        premise: "CT11",
        countryCode: "VN",
        postcode: "1000",
        county: "hoangmai",
        city: "hanoi",
        addressType: "BILLING",
      },
    ],
  },
  documents: [
    {
      documentId: "96ea7d60-89ed-4c3b-811c-d2c61f5feab2",
      documentName: "Bill",
      documentUrl: "http://url.com/#123",
    },
  ],
  invoiceReference: "#123456",
  invoiceNumber: "INV123456701",
  currency: "GBP",
  invoiceDate: "2021-05-27",
  dueDate: "2021-06-04",
  description: "Invoice is issued to Akila Jayasinghe",
  customFields: [
    {
      key: "invoiceCustomField",
      value: "value",
    },
  ],
  extensions: [
    {
      addDeduct: "ADD",
      value: 10,
      type: "PERCENTAGE",
      name: "tax",
    },
    {
      addDeduct: "DEDUCT",
      type: "FIXED_VALUE",
      value: 10.0,
      name: "discount",
    },
  ],
  items: [
    {
      itemReference: "itemRef",
      description: "Honda RC150",
      quantity: 1,
      rate: 1000,
      itemName: "Honda Motor",
      itemUOM: "KG",
      customFields: [
        {
          key: "taxiationAndDiscounts_Name",
          value: "VAT",
        },
      ],
      extensions: [
        {
          addDeduct: "ADD",
          value: 10,
          type: "FIXED_VALUE",
          name: "tax",
        },
        {
          addDeduct: "DEDUCT",
          value: 10,
          type: "PERCENTAGE",
          name: "tax",
        },
      ],
    },
  ],
};
