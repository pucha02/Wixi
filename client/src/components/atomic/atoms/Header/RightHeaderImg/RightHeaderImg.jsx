import './RightHeaderImg.css'

export const RightHeaderImg = ({ src }) => {
    return (
        <div className="right-header-img">
            <img src={src} alt="" />
        </div>
    )
}