import React from "react";
import Slider from "react-slick";
import "./Slider.css";
import "./Slider-test.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner1 from '../../../../assets/svg/baners/banner1.png'

const MySlider = ({ slides }) => {
  const [isZooming, setIsZooming] = React.useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 10000,
    swipe: !isZooming,
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      setIsZooming(true);
    }
  };

  const handleTouchEnd = () => {
    setIsZooming(false);
  };

  const renderSlideContent = (slide) => {
    switch (slide.type) {
     
      case "textOnly":
        return (
          <div className="slide-block slide2">
            <div className="slide-block-comp">
              <div className="background-slide2">
                <img src={slide.image} alt="" />
              </div>
              <div>
                <h2 className="slide-header header2">{slide.header}</h2>
                <h2 className="slide-header header2">{slide.header2}</h2>
                <div className="slide-txt header2">{slide.text}</div>
              </div>
            </div>
            <div className="slide-block-mob">
              <div>
                <h2 className="slide-header header2">{slide.header}</h2>
                <h2 className="slide-header header2">{slide.header2}</h2>
                <div className="slide-txt header2">{slide.text}</div>
              </div>
              <div className="background-slide2">
                <img src={slide.image} alt="" />
              </div>
            </div>
          </div>
        );
      case "imageOnly":
        return (
          <div className="slide-block slide2">
            <div className="slide-block-comp">
              <div className="background-slide3">
                <img src={slide.image} alt="" />
              </div>
              <div>
                <div className="slide-header header3">{slide.header}</div>
                <div className="slide-header header3">{slide.header2}</div>
              </div>
            </div>
            <div className="slide-block-mob">
              <div>
                <div className="slide-header header3">{slide.header}</div>
                <div className="slide-header header3">{slide.header2}</div>
              </div>
              <div className="background-slide3">
                <img src={slide.image} alt="" />
              </div>
            </div>
          </div>
        );

      default:
        return (

          <div className="slide-block">
            <div className="slide-block-comp">
              <div className="slide-text">
                <h2 className="slide-header">Комплект, що підкреслює переваги кожної фігури</h2>
                <p className="slide-txt">подвійний ефект пуш-ап, який візуально збільшує сідниці і щільний пояс, що втягує талію</p>
              </div>
              <div className="background-slide">
                <img src={Banner1} alt={slide.alt || "Slide"} />
              </div>
            </div>
            <div className="slide-block-mob">
              <div className="slide-text">
                <h2 className="slide-header">Комплект, що підкреслює<br />переваги кожної фігури</h2>
              </div>
              <div className="background-slide">
                <img src={Banner1} alt={slide.alt || "Slide"} />
              </div>
              <p className="slide-txt">подвійний ефект пуш-ап, який візуально збільшує сідниці і щільний пояс, що втягує талію</p>
            </div>
          </div>
        )



    };
  }
  return (
    <div
      className="slider-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>{renderSlideContent(slide)}</div>
        ))}
      </Slider>
    </div>
  );
};

export default MySlider;


// import Img from '../../../../assets/svg/baners/girls-2.png'
// const MySliderTest = () => {
//   return (
//     <div className="slider-container-test">
//       <img className="img-banner-test" src={Img} alt="" />
//       <span className="phrase-test">Ця фраза буде на банері</span>
//     </div>
//   );
// };

// export default MySliderTest 