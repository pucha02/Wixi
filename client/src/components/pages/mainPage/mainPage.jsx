import { Header } from "../../atomic/templates/Header/Header";
import MySlider from "../../atomic/templates/Slider/Slider";
import { checkPromo } from "../../../utils/checkPromocodeUsage";
import { PromoModal } from "../../atomic/organisms/PromoModal/PromoModal";
import HotStripDiscount from "../../../common/HotStripDiscount/HotStripDiscount";
import { CarouselListByTypes } from "../../atomic/templates/CarouselListByTypes/CarouselListByTypes";
import { Footer } from "../../atomic/templates/Footer/Footer";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './mainPage.css'
import Banner1 from '../../../assets/svg/baners/banner1.png'
import Banner2 from '../../../assets/svg/baners/banner2.png'
import Banner3 from '../../../assets/svg/baners/banner3.png'
import Banner4 from '../../../assets/svg/banner4.svg'

import BannerBag1 from '../../../assets/svg/baners/banner4-1.png'
import BannerBag2 from '../../../assets/svg/baners/banner4-2.png'
import BannerBag3 from '../../../assets/svg/baners/banner4-3.png'
import BannerBag4 from '../../../assets/svg/baners/banner4-4.png'

export const MainPage = () => {
    const [viewMobileFilter, setViewMobileFilter] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promoUsed, setPromoUsed] = useState(false);
    const [promoModalOpen, setPromoModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        checkPromo(setPromoUsed, setPromoModalOpen)
    }, []);
    const images = [
        Banner1,
        Banner2,
        Banner3,
        Banner4
    ];
    const slidesData = [
        {
            type: "imageWithText",
            header: "Комплект, що підкреслює",
            header2: 'переваги кожної фігури',
            text: "подвійний ефект пуш-ап, який візуально збільшує сідниці і щільний пояс, що втягує талію",
            image: Banner1,
            alt: "Комплект",
        },
        {
            type: "textOnly",
            header: `Фітнес одяг, що немає`,
            header2: 'обмежень щодо замірів',
            image: Banner2,
            text: "від розміру S до 4XL",
        },
        {
            type: "imageOnly",
            header: `Кожна фігура унікальна та прекрасна`,
            header2: 'А наш одяг - це лише спосіб підкреслити її',
            image: Banner3,
        },
        {
            type: 'withBags',
            header: 'Спортивна сумка -',
            header2: 'ідеальне доповнення до образу',
            text: 'вмістка, стильна, водонепроникна',
            image1: BannerBag1,
            image2: BannerBag2,
            image3: BannerBag3,
            image4: BannerBag4
        }

    ];

    return (
        <>
            <Header viewMobileFilter={viewMobileFilter} setViewMobileFilter={setViewMobileFilter} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <MySlider slides={slidesData} />
            {/* <HotStripDiscount content={'ЗНИЖКИ!'} /> */}
            <Link to={`/newproducts`}><h1 className="main-new">SALE %</h1></Link>
            <CarouselListByTypes type={'sale'} />
            <Link to={`/newproducts`}><h1 className="main-new">НОВИНКИ</h1></Link>
            <CarouselListByTypes type={'new'} />
            {/* <HotStripDiscount content={'ТОП ПРОДАЖІВ!'} /> */}
            <Link to={`/newproducts`}><h1 className="main-new">ТОП ПРОДАЖІВ</h1></Link>
            <CarouselListByTypes type={'top'} />
            <Footer />
            <PromoModal promoModalOpen={promoModalOpen} setPromoModalOpen={setPromoModalOpen} />
        </>
    )
}