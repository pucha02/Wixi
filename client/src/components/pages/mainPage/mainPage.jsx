import { Header } from "../../atomic/templates/Header/Header";
import MySlider from "../../atomic/templates/Slider/Slider";
import MySliderTest from "../../atomic/templates/Slider/Slider";
import HotStripDiscount from "../../../common/HotStripDiscount/HotStripDiscount";
import { CarouselListByTypes } from "../../atomic/templates/CarouselListByTypes/CarouselListByTypes";
import { Footer } from "../../atomic/templates/Footer/Footer";
import { useEffect } from "react";
import { useState } from "react";
import './mainPage.css'
import Banner1 from '../../../assets/svg/baners/banner1.png'
import Banner2 from '../../../assets/svg/baners/banner2.png'
import Banner3 from '../../../assets/svg/baners/banner3.png'

import Banner4 from '../../../assets/svg/banner4.svg'

export const MainPage = () => {
    const [viewMobileFilter, setViewMobileFilter] = useState(false)
    useEffect(() => {
        window.scrollTo(0, 0);

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
            type: "custom",
            customContent: (
                <div className="custom-content">
                    <h2>Ваш стиль — ваша унікальність</h2>
                    <button className="custom-button">Купити зараз</button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Header viewMobileFilter={viewMobileFilter} setViewMobileFilter={setViewMobileFilter} />
            <MySlider slides={slidesData} />
            <HotStripDiscount content={'ЗНИЖКИ!'} />
            <CarouselListByTypes type={'sale'} />
            <h1 className="main-new">НОВИНКИ</h1>
            <CarouselListByTypes type={'new'} />
            <HotStripDiscount content={'ТОП ПРОДАЖІВ!'} />
            <CarouselListByTypes type={'top'} />
            <Footer />
        </>
    )
}