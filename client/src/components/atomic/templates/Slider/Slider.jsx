import React, { useState, useEffect, useRef } from "react";

import Banner1 from "../../../../assets/svg/baners/banner1.png";

const MySlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Начинаем со второго элемента (первый дубликат)
  const slideInterval = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Дублируем первый и последний слайды
  const extendedSlides = [
    slides[slides.length - 1], // Последний слайд
    ...slides,
    slides[0], // Первый слайд
  ];

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const startAutoPlay = () => {
    slideInterval.current = setInterval(nextSlide, 5000);
  };

  const stopAutoPlay = () => {
    clearInterval(slideInterval.current);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    stopAutoPlay();
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
    startAutoPlay();
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    touchStartX.current = e.clientX;
    stopAutoPlay();
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    touchEndX.current = e.clientX;
    handleSwipe();
    startAutoPlay();
  };

  const handleSwipe = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > 50) {
      nextSlide();
    } else if (swipeDistance < -50) {
      prevSlide();
    }
  };

  // Обрабатываем переходы в начале или конце слайдера
  useEffect(() => {
    if (isTransitioning) {
      const transitionTimeout = setTimeout(() => {
        setIsTransitioning(false);

        if (currentIndex === 0) {
          setCurrentIndex(slides.length); // Возвращаемся к последнему слайду
        } else if (currentIndex === slides.length + 1) {
          setCurrentIndex(1); // Возвращаемся к первому слайду
        }
      }, 300); // Длительность анимации (должна совпадать с CSS transition)

      return () => clearTimeout(transitionTimeout);
    }
  }, [currentIndex, isTransitioning, slides.length]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  return (
    <div
      className="slider-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className="slider-wrapper"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 0.3s ease-in-out" : "none",
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div key={index} className="slide">
            {renderSlideContent(slide)}
          </div>
        ))}
      </div>
    </div>
  );
};

const renderSlideContent = (slide) => {
  switch (slide.type) {
    case "textOnly":
      return (
        <div className="slide-block slide2">
          <div className="slide-block-comp">
            <div className="background-slide2">
              <img src={slide.image} alt="" draggable="false" />
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
              <h2 className="slide-header header2" style={{ marginTop: "0" }}>
                {slide.header2}
              </h2>
              <div
                className="slide-txt header2"
                style={{ fontSize: "21px", fontWeight: "600" }}
              >
                {slide.text}
              </div>
            </div>
            <div className="background-slide2">
              <img src={slide.image} alt="" draggable="false" />
            </div>
          </div>
        </div>
      );
    case "imageOnly":
      return (
        <div className="slide-block slide2">
          <div className="slide-block-comp">
            <div className="background-slide3">
              <img src={slide.image} alt="" draggable="false" />
            </div>
            <div>
              <div className="slide-header header3">{slide.header}</div>
              <div className="slide-header header3">{slide.header2}</div>
            </div>
          </div>
          <div className="slide-block-mob">
            <div>
              <div className="slide-header header3">{slide.header}</div>
              <div className="slide-header header3" style={{ marginTop: "0" }}>
                {slide.header2}
              </div>
            </div>
            <div className="background-slide3">
              <img src={slide.image} alt="" draggable="false" />
            </div>
          </div>
        </div>
      );
    case "withBags":
      return (
        <div
          className="slide-block slide2"
          style={{ backgroundColor: "#D6D6D6" }}
        >
          <div className="slide-block-comp" style={{ marginTop: "0" }}>
            <div className="background-slide4 first">
              <img src={slide.image1} alt="" draggable="false" />
            </div>
            <div className="background-slide4 second">
              <img src={slide.image2} alt="" draggable="false" />
            </div>
            <div className="background-slide4 third">
              <img src={slide.image3} alt="" draggable="false" />
            </div>
            <div className="slide4-left">
              <h2 className="slide-header header4">{slide.header}</h2>
              <h2 className="slide-header header4">{slide.header2}</h2>
              <div className="slide-txt header2">
                {slide.text}
                <img src={slide.image4} alt="" draggable="false" />
              </div>
            </div>
          </div>
          <div className="slide-block-mob">
            <div>
              <h2 className="slide-header header4" style={{ marginTop: "0" }}>
                {slide.header}
              </h2>
              <h2 className="slide-header header4" style={{ marginTop: "0" }}>
                {slide.header2}
              </h2>
            </div>
            <div className="slide4-images">
              <div className="background-slide4 first">
                <img src={slide.image1} alt="" draggable="false" />
              </div>
              <div className="background-slide4 second">
                <img src={slide.image2} alt="" draggable="false" />
              </div>
              <div className="background-slide4 third">
                <img src={slide.image3} alt="" draggable="false" />
              </div>
            </div>
            <div
              className="slide-txt header2"
              style={{ fontSize: "20px", fontWeight: "900", width: "auto" }}
            >
              {slide.text}
            </div>
          </div>
        </div>
      );
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
              <img src={Banner1} alt={slide.alt || "Slide"} draggable="false" />
            </div>
          </div>
          <div className="slide-block-mob">
            <div className="slide-text">
              <h2 className="slide-header">
                Комплект, що підкреслює
                <br />
                переваги кожної фігури
              </h2>
            </div>
            <div className="background-slide">
              <img src={Banner1} alt={slide.alt || "Slide"} draggable="false" />
            </div>
            <p className="slide-txt">
              подвійний ефект пуш-ап, який візуально збільшує сідниці і щільний
              пояс, що втягує талію
            </p>
          </div>
        </div>
      );
  }
};

export default MySlider;
