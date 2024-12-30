import { TextareaComent } from "../../../atoms/OrderForm/Textarea/TextareaComent";

export const ComentInfo = ({ handleChange, userData }) => {
  return (
    <div className="coment-info-block">
      <div className="coment-info-head">КОМЕНТАР</div>
      <div className="contact-info-textarea">
        <TextareaComent
          handleChange={handleChange}
          name={"coment"}
          userData={userData.coment}
        />
      </div>
    </div>
  );
};
