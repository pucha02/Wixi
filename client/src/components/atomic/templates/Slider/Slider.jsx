import React from "react";
import Slider from "react-slick";
import "./Slider.css";
import "./Slider-test.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const MySlider = ({ images }) => {
//   const [isZooming, setIsZooming] = React.useState(false);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 10000,
//     swipe: !isZooming, // Блокируем свайп, если пользователь зумирует
//   };

//   const handleTouchStart = (e) => {
//     if (e.touches.length === 2) {
//       setIsZooming(true);
//     }
//   };

//   const handleTouchEnd = () => {
//     setIsZooming(false);
//   };

//   return (
//     <div
//       className="slider-container"
//       onTouchStart={handleTouchStart}
//       onTouchEnd={handleTouchEnd}
//     >
//       <Slider {...settings}>
//         {images.map((image, index) => (
//           <div className="slide-block" key={index}>
//             <img src={image} alt={`Slide ${index + 1}`} />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default MySlider;
import Img from '../../../../assets/svg/baners/girls-2.png'
const MySliderTest = () => {
  return (
    <div className="slider-container-test">
      <img className="img-banner-test" src={Img} alt="" />
      <span className="phrase-test">Ця фраза буде на банері</span>
    </div>
  );
};

export default MySliderTest 