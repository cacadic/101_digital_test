export function generatePagination(
  pageNumber: number,
  totalRecords: number,
  pageSize: number
) {
  const totalPages = Math.ceil(totalRecords / pageSize);
  const pagination = [];

  if (pageNumber > 1) {
    pagination.push({ type: "previous", page: pageNumber - 1 });
  }

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= pageNumber - 1 && i <= pageNumber + 1)
    ) {
      pagination.push({ type: "page", page: i });
    } else if (
      (i === pageNumber - 2 || i === pageNumber + 2) &&
      !pagination.find((item) => item.type === "ellipsis")
    ) {
      pagination.push({ type: "ellipsis" });
    }
  }

  if (pageNumber < totalPages) {
    pagination.push({ type: "next", page: pageNumber + 1 });
  }

  return pagination;
}
