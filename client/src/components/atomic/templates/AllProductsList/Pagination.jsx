export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxVisiblePages = 5; // Максимальное количество видимых страниц

    const getVisiblePages = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Обеспечиваем, что всегда показываются первая и последняя страницы
        if (startPage > 1) {
            pages.unshift(1);
            if (startPage > 2) {
                pages.splice(1, 0, "..."); // Добавляем многоточие
            }
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push("...");
            }
            pages.push(totalPages);
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="pagination">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                {'<'}
            </button>
            {visiblePages.map((page, index) =>
                typeof page === "number" ? (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        className={currentPage === page ? "active" : ""}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="dots">
                        {page}
                    </span>
                )
            )}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                {'>'}
            </button>
        </div>
    );
};