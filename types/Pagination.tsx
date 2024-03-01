type HandlePaginationT = (
  e: React.MouseEvent<
    HTMLButtonElement | HTMLParagraphElement | SVGSVGElement,
    MouseEvent
  >,
  page: number
) => void;

type PaginationPropsT = {
  handlePagination: HandlePaginationT;
  page: number;
};

export type { HandlePaginationT, PaginationPropsT}
