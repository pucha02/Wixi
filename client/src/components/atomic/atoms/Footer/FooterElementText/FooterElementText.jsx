import './FooterElementText.css'
import { Link } from 'react-router-dom'

export const FooterElementText = ({text, link}) => {
    return(
        <div className="footer-element-text">
            <Link to={link}>{text}</Link>
        </div>
    )
}