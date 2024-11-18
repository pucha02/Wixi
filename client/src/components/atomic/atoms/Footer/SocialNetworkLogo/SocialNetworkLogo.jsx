import './SocialNetworkLogo.css'

export const SocialNetworkLogo = ({src}) => {
    return (
        <div className="social-network-block">
            <img src={src} alt="" />
        </div>
    )
}