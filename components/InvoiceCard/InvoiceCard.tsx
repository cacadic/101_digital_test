import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Invoice } from "@/types/invoices";

interface InvoiceCardProps {
  invoice: Invoice;
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  return (
    <Card className="sm:basis-1/3 sm:max-w-[calc(33.33%-16px)] w-full mx-4 sm:mx-0">
      <CardHeader>
        <CardTitle>Invoice #{invoice.invoiceNumber}</CardTitle>
        <CardDescription>{invoice.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <div>
          <strong>Invoice Date:</strong> {invoice.invoiceDate}
        </div>
        <div>
          <strong>Due Date:</strong> {invoice.dueDate}
        </div>
        <div>
          <strong>Customer:</strong> {invoice.customer.firstName}{" "}
          {invoice.customer.lastName}
        </div>
        <div>
          <strong>Sub Total:</strong> {invoice.currencySymbol}
          {invoice.invoiceSubTotal.toFixed(2)}
        </div>
        <div>
          <strong>Total Discount:</strong> {invoice.currencySymbol}
          {invoice.totalDiscount.toFixed(2)}
        </div>
        <div>
          <strong>Total Tax:</strong> {invoice.currencySymbol}
          {invoice.totalTax.toFixed(2)}
        </div>
        <div>
          <strong>Total Amount:</strong> {invoice.currencySymbol}
          {invoice.totalAmount.toFixed(2)}
        </div>
        <div>
          <strong>Balance Amount:</strong> {invoice.currencySymbol}
          {invoice.balanceAmount.toFixed(2)}
        </div>
        <div>
          <strong>Reference No:</strong> {invoice.referenceNo}
        </div>
        <div className="flex items-center">
          <strong>Status:</strong>
          {invoice.status.map((status) => (
            <Badge
              key={status.key}
              variant={status.value ? "destructive" : "default"}
              className="ml-2"
            >
              {status.key}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
