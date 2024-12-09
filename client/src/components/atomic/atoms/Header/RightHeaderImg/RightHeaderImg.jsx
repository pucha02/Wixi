import './RightHeaderImg.css'

export const RightHeaderImg = ({ src, onClick }) => {
    return (
        <div className="right-header-img">
            <img src={src} alt="" onClick={onClick}/>
        </div>
    )
}