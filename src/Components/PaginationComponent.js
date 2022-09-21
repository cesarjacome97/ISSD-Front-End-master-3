import React, { useMemo } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const DOTS = '...';

const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
}) => {

    const range = (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    };

    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {

            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};

const PaginationComponent = (props) => {
    const { totalCount, currentPage, pageSize, onPageChange, siblingCount } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <Pagination listClassName="justify-content-center">
            <PaginationItem disabled={currentPage === 1}>
                <PaginationLink tag="span" onClick={onPrevious}>
                    <i className="tim-icons icon-minimal-left" />
                </PaginationLink>
            </PaginationItem>
            {paginationRange.map((pageNumber, i) => {
                if (pageNumber === DOTS) {
                    return <li>&#8230;</li>;
                }
                return (<PaginationItem key={i} active={pageNumber === currentPage}>
                    <PaginationLink tag="span" onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </PaginationLink>
                </PaginationItem>)
            })}
            <PaginationItem disabled={currentPage === lastPage}>
                <PaginationLink tag="span" onClick={onNext}>
                    <i className="tim-icons icon-minimal-right" />
                </PaginationLink>
            </PaginationItem>
        </Pagination>
    );
}
export default PaginationComponent;