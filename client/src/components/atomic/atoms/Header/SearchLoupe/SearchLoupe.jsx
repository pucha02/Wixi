import './SearchLoupe.css'

export const SearchLoupe = ({ src, setIsModalSearchOpen=null }) => {
    return (
        <div className="search-loupe">
            <img onClick={()=>setIsModalSearchOpen(true)} src={src} alt="" />
        </div>
    )
}