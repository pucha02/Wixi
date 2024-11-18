import { EmailInput } from "../../atoms/Footer/EmailInput/EmailInput"
import { FooterLogo } from "../../atoms/Footer/FooterLogo/FooterLogo"
import { SocialNetworkLogo } from "../../atoms/Footer/SocialNetworkLogo/SocialNetworkLogo"
import TgImg from '../../../../assets/svg/tg-logo.svg'
import InstImg from '../../../../assets/svg/inst-logo.svg'
import FooterImg from '../../../../assets/svg/footer-logo.svg'

import './Footer.css'

export const Footer = () => {
    return (
        <div className="footer-block">
            <div className="footer-container">
                <div>
                    <SocialNetworkLogo src={TgImg} />
                    <SocialNetworkLogo src={InstImg} />
                </div>
                <div className="footer-logo-block">
                    <FooterLogo src={FooterImg} />
                </div>
            </div>
        </div>
    )
}