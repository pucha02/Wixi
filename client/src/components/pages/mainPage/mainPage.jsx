import { Header } from "../../atomic/templates/Header/Header";
import MySlider from "../../atomic/templates/Slider/Slider";
import HotStripDiscount from "../../../common/HotStripDiscount/HotStripDiscount";
import HotStripTop from "../../../common/HotStripTop/HotStripTop";
import { CarouselListByTypes } from "../../atomic/templates/CarouselListByTypes/CarouselListByTypes";
import { Footer } from "../../atomic/templates/Footer/Footer";
import { useEffect } from "react";
import Banner1 from '../../../assets/svg/banner1.svg'
import Banner2 from '../../../assets/svg/banner2.svg'
import Banner3 from '../../../assets/svg/banner3.svg'
import Banner4 from '../../../assets/svg/banner4.svg'


export const MainPage = () => {
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
            <Header />
            <MySlider images={images} />
            <HotStripDiscount content={'ЗНИЖКИ!'}/>
            <CarouselListByTypes type={'sale'}/>
            <HotStripDiscount content={'НОВИНКИ!'}/>
            <CarouselListByTypes type={'new'}/>
            <HotStripDiscount content={'ТОП ПРОДАЖІВ!'}/>
            <CarouselListByTypes type={'top'}/>
            <Footer/>
        </>
    )
}