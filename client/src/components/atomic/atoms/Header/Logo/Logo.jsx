import './Logo.css'

export const Logo = ({ src }) => {
    return (
        <div>
            <img className="logo-img" src={src} alt="" />
        </div>
    )
}