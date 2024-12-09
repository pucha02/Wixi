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

                <FooterElementText text={text.aboutUs} />
                <FooterElementText text={text.exchangeAndReturn} />
                <FooterElementText text={text.privacyPolicy} />
                <FooterElementText text={text.delivery} />
                <FooterElementText text={text.payment} />
                <FooterElementText text={text.categories} />
                <FooterElementText text={text.promotions} />
            </div>
        </div>
    )
}