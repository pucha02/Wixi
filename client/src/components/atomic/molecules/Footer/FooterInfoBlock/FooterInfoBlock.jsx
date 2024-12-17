import { FooterElementHeadText } from "../../../atoms/Footer/FooterElementHeadText/FooterElementHeadText"
import { FooterElementImg } from "../../../atoms/Footer/FooterElementImg/FooterElementImg"
import { FooterElementText } from "../../../atoms/Footer/FooterElementText/FooterElementText"
import './FooterInfoBlock.css'

export const FooterInfoBlock = ({ text, headtext, src }) => {
    return (
        <div className="footer-info-element-block">
            <div className="footer-info-element-top">
                <FooterElementImg src={src} />
                <FooterElementHeadText headtext={headtext} />
            </div>
            <div className="footer-info-element-bottom">

                <FooterElementText text={text.aboutUs.title} link={text.aboutUs.link}/>
                <FooterElementText text={text.exchangeAndReturn.title} link={text.exchangeAndReturn.link}/>
                <FooterElementText text={text.privacyPolicy.title} link={text.privacyPolicy.link}/>
                <FooterElementText text={text.delivery.title}  link={text.delivery.link}/>
                <FooterElementText text={text.payment.title} link={text.payment.link}/>
                {/* <FooterElementText text={text.categories.title} />
                <FooterElementText text={text.promotions.title} /> */}
            </div>
        </div>
    )
}