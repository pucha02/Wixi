import { RightHeaderImg } from "../../atoms/Header/RightHeaderImg/RightHeaderImg"
import { RightHeaderLabel } from "../../atoms/Header/RightHeaderLabel/RightHeaderLabel"

export const RightHeaderElement = ({src, label}) => {
    return (
        <div>
            <RightHeaderImg src={src}/>
            <RightHeaderLabel label={label}/>
        </div>
    )
}