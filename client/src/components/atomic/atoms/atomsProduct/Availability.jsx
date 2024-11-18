export const ProductAvailability = ({ count }) => {
    return (
        <div>
            <p>{count > 0 ? 'В наявності' : "Немає в наявності"}</p>
        </div>
    );
};
