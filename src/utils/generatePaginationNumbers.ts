export const generatePaginationNumbers = (curentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (curentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    if (curentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [
        1,
        '...',
        curentPage - 1,
        curentPage,
        curentPage + 1,
        '...',
        totalPages
    ];
}