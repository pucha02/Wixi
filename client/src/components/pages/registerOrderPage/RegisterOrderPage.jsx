import { Header } from "../../atomic/templates/Header/Header";
import { Footer } from "../../atomic/templates/Footer/Footer";
import { RegisterOrder } from "../../atomic/templates/RegisterOrder/RegisterOrder";
import { useState } from "react";

export const RegisterOrderPage = () => {
    const [viewMobileFilter, setViewMobileFilter] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Header viewMobileFilter={viewMobileFilter} setViewMobileFilter={setViewMobileFilter} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            <RegisterOrder />
            <Footer />
        </>
    )
};
