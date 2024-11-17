import './FooterLogo.css'

export const FooterLogo = ({src}) => {
    return(
        <div className="footer-logo-block">
            <img src={src} alt="" />
        </div>
    )
}