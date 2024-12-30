

export const RightHeaderImg = ({ src, onClick, className }) => {
    return (
        <div className={`right-header-img ${className}`}>
            <img className={`${className}`} src={src} alt="" onClick={onClick}/>
        </div>
    )
}