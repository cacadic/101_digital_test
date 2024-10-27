import { auth } from "@/auth";
import FormSearch from "@/components/form-search";
import { InvoiceCard } from "@/components/InvoiceCard/InvoiceCard";
import { SortBy } from "@/components/sort-by";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { InvoiceData } from "@/types/invoices";
import { generatePagination } from "@/ultils/common";
import axios from "axios";
import { redirect } from "next/navigation";

let resData: InvoiceData;

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  const session = await auth();

  const accessToken = session?.user?.accessToken;
  const orgToken = session?.user?.profile?.memberships[0].token;

  // console.log({ accessToken, orgToken });

  const ordering = searchParams.ordering || "DESCENDING";
  const pageNum = searchParams.page || 1;
  const keyword = searchParams.keyword || "";

  try {
    const res = await axios(process.env.NEXT_PUBLIC_FETCH_INVOICES_API!, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "org-token": orgToken,
      },
      params: {
        sortBy: "CREATED_DATE",
        ordering,
        pageNum: pageNum,
        pageSize: 6,
        keyword: keyword,
      },
    });

    resData = res.data as InvoiceData;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    redirect("/auth/sign-out");
  }

  if (!resData) return null;

  const { pageNumber, pageSize, totalRecords } = resData.paging;

  const paginationItems = generatePagination(
    pageNumber,
    totalRecords,
    pageSize
  );

  const onAddInvoiceHandle = async () => {
    "use server";

    redirect("/add");
  };

  return (
    <div className="flex flex-col gap-4 pt-4 pb-10 max-w-[1280px] w-full px-0 md:px-4 lg:px-0 ">
      <div className="flex sm:items-center gap-4 flex-row sm:flex-nowrap flex-wrap px-4 sm:px-0">
        <SortBy />
        <FormSearch />
        <form action={onAddInvoiceHandle} className="sm:order-3 order-1">
          <Button variant="outline" type="submit">
            Add New Invoice
          </Button>
        </form>
      </div>

      {totalRecords === 0 && (
        <div className="text-center mt-4 font-bold text-xl">
          No invoice found
        </div>
      )}

      <div className="text-center">Page #{pageNum}</div>

      <div className="flex flex-wrap sm:justify-between justify-center gap-4 max-w-[1280px] w-full mx-auto">
        {resData.data.map((invoice) => (
          <InvoiceCard key={invoice.invoiceId} invoice={invoice} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          {paginationItems.map((item, index) => (
            <PaginationItem key={index}>
              {item.type === "previous" && (
                <PaginationPrevious href={`?page=${item.page}`} />
              )}
              {item.type === "page" && (
                <PaginationLink href={`?page=${item.page}`}>
                  {item.page}
                </PaginationLink>
              )}
              {item.type === "ellipsis" && <PaginationEllipsis />}
              {item.type === "next" && (
                <PaginationNext href={`?page=${item.page}`} />
              )}
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
