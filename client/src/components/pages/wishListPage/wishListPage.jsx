import { Header } from "../../atomic/templates/Header/Header";
import { Footer } from "../../atomic/templates/Footer/Footer";
import { WishList } from "../../atomic/templates/WishList/WishList";

export const WishListPage = () => {
    return (
        <>
            <Header />
            <WishList />
            <Footer />
        </>
    )
}