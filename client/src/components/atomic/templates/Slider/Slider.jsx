import React from "react";
import Slider from "react-slick";
import "./Slider.css";
import "./Slider-test.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner1 from "../../../../assets/svg/baners/banner1.png";

const MySlider = ({ slides }) => {
  const [isZooming, setIsZooming] = React.useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 5000,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
  };
  const sliderRef = React.useRef(null);
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      setIsZooming(true);
    }
    e.stopPropagation(); // Предотвращаем всплытие события
  };

  const handleTouchEnd = (e) => {
    setIsZooming(false);
    e.stopPropagation();
  };
  // React.useEffect(() => {
  //   if (!isZooming && sliderRef.current) {
  //     sliderRef.current.slickPlay(); // Включаем автоплей
  //   }
  // }, [isZooming]);

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
                <h2 className="slide-header header2" style={{ marginTop: "0" }}>{slide.header2}</h2>
                <div className="slide-txt header2"  style={{fontSize:"21px", fontWeight:"600"}}>{slide.text}</div>
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
                <div className="slide-header header3" style={{ marginTop: "0" }}>{slide.header2}</div>
              </div>
              <div className="background-slide3">
                <img src={slide.image} alt="" />
              </div>
            </div>
          </div>
        );
      case "withBags":
        return (
          <div className="slide-block slide2" style={{ backgroundColor: "#D6D6D6" }}>
            <div className="slide-block-comp" style={{ marginTop: "0" }}>

              <div className="background-slide4 first">
                <img src={slide.image1} alt="" />
              </div>
              <div className="background-slide4 second">
                <img src={slide.image2} alt="" />
              </div>
              <div className="background-slide4 third">
                <img src={slide.image3} alt="" />
              </div>
              <div className="slide4-left">
                <h2 className="slide-header header4">{slide.header}</h2>
                <h2 className="slide-header header4">{slide.header2}</h2>
                <div className="slide-txt header2">
                  {slide.text}
                  <img src={slide.image4} alt="" />
                </div>



              </div>
            </div>
            <div className="slide-block-mob">
              <div>
                <h2 className="slide-header header4" style={{ marginTop: "0" }}>{slide.header}</h2>
                <h2 className="slide-header header4" style={{ marginTop: "0" }}>{slide.header2}</h2>

              </div>
              <div className="slide4-images">
                <div className="background-slide4 first">
                  <img src={slide.image1} alt="" />
                </div>
                <div className="background-slide4 second">
                  <img src={slide.image2} alt="" />
                </div>
                <div className="background-slide4 third">
                  <img src={slide.image3} alt="" />
                </div>
              </div>
              <div className="slide-txt header2" style={{fontSize:"20px", fontWeight:"900", width:"auto"} }>{slide.text}</div>
            </div>
          </div>
        )
      default:
        return (
          <div className="slide-block">
            <div className="slide-block-comp">
              <div className="slide-text">
                <h2 className="slide-header">
                  Комплект, що підкреслює переваги кожної фігури
                </h2>
                <p className="slide-txt">
                  подвійний ефект пуш-ап, який візуально збільшує сідниці і
                  щільний пояс, що втягує талію
                </p>
              </div>
              <div className="background-slide">
                <img src={Banner1} alt={slide.alt || "Slide"} />
              </div>
            </div>
            <div className="slide-block-mob">
              <div className="slide-text">
                <h2 className="slide-header">
                  Комплект, що підкреслює<br />
                  переваги кожної фігури
                </h2>
              </div>
              <div className="background-slide">
                <img src={Banner1} alt={slide.alt || "Slide"} />
              </div>
              <p className="slide-txt">
                подвійний ефект пуш-ап, який візуально збільшує сідниці і
                щільний пояс, що втягує талію
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="slider-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: isZooming ? "pan-y pinch-zoom" : "auto" }}
    >
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>{renderSlideContent(slide)}</div>
        ))}
      </Slider>
    </div>
  );
};

export default MySlider;

