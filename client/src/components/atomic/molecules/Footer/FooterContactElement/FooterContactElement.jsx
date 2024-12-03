import { FooterElementHeadText } from "../../../atoms/Footer/FooterElementHeadText/FooterElementHeadText"
import { FooterElementImg } from "../../../atoms/Footer/FooterElementImg/FooterElementImg"
import { FooterElementText } from "../../../atoms/Footer/FooterElementText/FooterElementText"
import './FooterContactElement.css'

export const FooterContactElement = ({ text, headtext, src }) => {
    return (
        <div className="footer-contact-element-block">
            <div className="footer-contact-element-top">
                <FooterElementImg src={src} />
                <FooterElementHeadText headtext={headtext} />
            </div>
            <div className="footer-contact-element-bottom">
                <FooterElementText text={text} />
            </div>
        </div>
    )
}