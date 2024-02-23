export type HandlePaginationT = (
  e: React.MouseEvent<
    HTMLButtonElement | HTMLParagraphElement | SVGSVGElement,
    MouseEvent
  >,
  page: number
) => void;

export type PaginationPropsT = {
  handlePagination: HandlePaginationT;
  page: number;
};
