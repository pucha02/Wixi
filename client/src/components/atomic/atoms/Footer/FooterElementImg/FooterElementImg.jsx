import './FooterElementImg.css'

export const FooterElementImg = ({src}) => {
    return(
        <div className="footer-element-img">
            <img src={src} alt="" />
        </div>
    )
}