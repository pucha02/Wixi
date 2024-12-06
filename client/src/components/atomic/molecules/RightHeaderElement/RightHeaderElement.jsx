import { RightHeaderImg } from "../../atoms/Header/RightHeaderImg/RightHeaderImg"
import { RightHeaderLabel } from "../../atoms/Header/RightHeaderLabel/RightHeaderLabel"

export const RightHeaderElement = ({src, label, onClick}) => {
    return (
        <div>
            <RightHeaderImg src={src} onClick={onClick}/>
            <RightHeaderLabel label={label}/>
        </div>
    )
}