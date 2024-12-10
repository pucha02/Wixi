import { WishlistItems } from "../../organisms/Wishlist/Wishlist"
import './WishList.css'

export const WishList = () => {
    return (
        <div>
            <div className="wish-list-container">
                <WishlistItems />
            </div>
        </div>
    )
}