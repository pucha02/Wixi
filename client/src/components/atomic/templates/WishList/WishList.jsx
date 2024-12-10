import { WishlistItems } from "../../organisms/Wishlist/Wishlist"
import { useEffect } from "react";
import './WishList.css'

export const WishList = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <div className="wish-list-container">
                <WishlistItems />
            </div>
        </div>
    )
}