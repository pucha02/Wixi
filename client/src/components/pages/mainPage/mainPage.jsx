import { Header } from "../../atomic/templates/Header/Header";
import MySlider from "../../atomic/templates/Slider/Slider";
import HotStripDiscount from "../../../common/HotStripDiscount/HotStripDiscount";
import { CarouselListByTypes } from "../../atomic/templates/CarouselListByTypes/CarouselListByTypes";
import { Footer } from "../../atomic/templates/Footer/Footer";
import { useEffect } from "react";
import { useState } from "react";
import './mainPage.css'
import Banner1 from '../../../assets/svg/banner1.svg'
import Banner2 from '../../../assets/svg/banner2.svg'
import Banner3 from '../../../assets/svg/banner3.svg'
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
    return (
        <>
            <Header viewMobileFilter={viewMobileFilter} setViewMobileFilter={setViewMobileFilter}/>
            <MySlider images={images} />
            <HotStripDiscount content={'ЗНИЖКИ!'}/>
            <CarouselListByTypes type={'sale'}/>
            <h1 className="main-new">НОВИНКИ</h1>
            <CarouselListByTypes type={'new'}/>
            <HotStripDiscount content={'ТОП ПРОДАЖІВ!'}/>
            <CarouselListByTypes type={'top'}/>
            <Footer/>
        </>
    )
}