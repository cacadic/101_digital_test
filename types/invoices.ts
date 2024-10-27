export interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
}

export interface Merchant {
  id: string;
  name: string;
  addresses: Address[];
}

export interface Status {
  key: string;
  value: boolean;
}

export interface CustomField {
  key: string;
  value: string;
}

export interface Invoice {
  createdAt: string; // ISO date string
  createdBy: string;
  currency: string;
  currencySymbol: string;
  customer: Customer;
  description: string;
  dueDate: string; // ISO date string
  extensions: unknown[]; // Unknown array for additional custom fields
  invoiceDate: string; // ISO date string
  invoiceId: string;
  invoiceNumber: string;
  invoiceSubTotal: number;
  totalDiscount: number;
  totalTax: number;
  totalAmount: number;
  totalPaid: number;
  balanceAmount: number;
  numberOfDocuments: number;
  documents: unknown[]; // Unknown array for document objects
  items: unknown[]; // Unknown array for items in the invoice
  merchant: Merchant;
  payments: unknown[]; // Unknown array for payment details
  referenceNo: string;
  invoiceReference: string;
  status: Status[];
  subStatus: Status[];
  type: string;
  version: string;
  invoiceGrossTotal: number;
  customFields: CustomField[];
}

export interface Paging {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
}

export interface InvoiceData {
  data: Invoice[];
  paging: Paging;
}
