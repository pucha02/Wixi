import { FooterContactElement } from "../../molecules/Footer/FooterContactElement/FooterContactElement"
import { Link } from "react-router-dom"
import { FooterInfoBlock } from "../../molecules/Footer/FooterInfoBlock/FooterInfoBlock"
import { FooterLogo } from "../../atoms/Footer/FooterLogo/FooterLogo"
import { SocialNetworkLogo } from "../../atoms/Footer/SocialNetworkLogo/SocialNetworkLogo"
import TgImg from '../../../../assets/svg/tg-logo.svg'
import InstImg from '../../../../assets/svg/inst-logo.svg'
import FooterImg from '../../../../assets/svg/footer-logo.svg'

import FooterAdress from '../../../../assets/svg/footerAdress.svg'
import FooterClock from '../../../../assets/svg/footerClock.svg'
import FooterEmail from '../../../../assets/svg/footerEmail.svg'
import FooterInfo from '../../../../assets/svg/footerInfo.svg'
import FooterPhone from '../../../../assets/svg/footerPhone.svg'

import './Footer.css'

export const Footer = () => {
    const text = {
        aboutUs: { title: "Про нас", link: "/aboutus" },
        exchangeAndReturn: { title: "Обмін та повернення", link: "/exchangeandreturn" },
        privacyPolicy: { title: "Політика конфіденційності", link: "/privacypolicy" },
        delivery: { title: "Доставка", link: "/delivery" },
        payment: { title: "Оплата", link: "/payment" },
        // categories: { title: "Категорії", link: "" },
        // promotions: { title: "Акції", link: "" },
    };

    return (
        <div className="footer-block">
            <div className="footer-container">
                <div className="head-footer">
                    <div className="footer-logo-block">
                        <FooterLogo src={FooterImg} />
                    </div>
                    <div className="social-network">
                        <div className="social-network-el-block">
                            <SocialNetworkLogo src={TgImg} />
                            <div className="social-network-el-txt">wixi.brand</div>
                        </div>
                        <div className="social-network-el-block">
                            <SocialNetworkLogo src={InstImg} />
                            <div className="social-network-el-txt">wixibrand</div>
                        </div>
                    </div>
                </div>
                <div className="bottom-footer">
                    <div className="bottom-footer-col">
                        <FooterContactElement headtext={'Контакти'} text={"+38 (099) 011 01 11"} src={FooterPhone} />
                        <FooterContactElement headtext={'Email'} text={"wixi_brend@gmail.com"} src={FooterEmail} />
                    </div>
                    <div className="bottom-footer-col">
                        <FooterContactElement headtext={'Наша адреса'} text={"Україна, м. Місто, вул. Вулиця, 10"} src={FooterAdress} />
                        <FooterContactElement headtext={'Графік роботи'} text={"Працюємо щодня з 9 до 21"} src={FooterClock} />
                    </div>
                    <div className="bottom-footer-col">
                        <FooterInfoBlock headtext={'Інформація'} src={FooterInfo} text={text} />
                    </div>
                </div>
            </div>
        </div>
    )
}