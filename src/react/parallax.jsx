import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const ParallaxSection = () => {
  const [scrollY, setScrollY] = useState(0);

  // Контролы анимаций ховера
  const ANIMATION_CONFIG = {
    tension: 300,
    friction: 30,
  };

  // Контролы стилей текстов в параллаксе
  const STYLES = {
    textBlock: {
      position: "absolute",
      zIndex: 4,
      cursor: "pointer",
      padding: "0 0.8vw",
      backgroundColor: "var(--white)",
    },
    heading: {
      fontFamily: '"Newsreader", sans-serif',
      fontSize: "3.555vw",
      color: "#000",
      fontWeight: "500",
      lineHeight: "1.2",
    },
  };

  // Изначальный ховер у объектов
  const [hoveredElements, setHoveredElements] = useState({
    px_pic01: false,
    px_pic02: false,
    px_pic03: false,
    px_pic04: false,
    px_pic07: false,
    px_pic06: false,
    px_pic05: false,
    px_pic08: false,
    px_pic09: false,
    px_pic10: false,
    px_pic11: false,
    textBlock: false,
  });

  // Функции для конвертации viewport единиц
  const vw = (value) => (window.innerWidth * value) / 100;
  const vh = (value) => (window.innerHeight * value) / 100;

  useEffect(() => {
    const handleScroll = () => {
      const rect = document
        .getElementById("parallax-mount-point")
        ?.getBoundingClientRect();
      if (rect) {
        const progress = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
          )
        );
        setScrollY(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Контролы анимаций пикч

  const px_pic01 = useSpring({
    transform: `translateY(${scrollY * vw(-40) + vw(10)}px) translateX(${vw(
      1.2
    )}px) scale(${hoveredElements.px_pic01 ? 1 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const px_pic02 = useSpring({
    transform: `translateY(${scrollY * vw(-200) + vw(+90)}px) translateX(${-vw(
      24
    )}px) scale(${hoveredElements.px_pic02 ? 1.15 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const px_pic03 = useSpring({
    transform: `translateY(${scrollY * vw(-380) + vw(+195)}px) translateX(${vw(
      26.042
    )}px) scale(${hoveredElements.px_pic03 ? 1.2 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const px_pic04 = useSpring({
    transform: `translateY(${scrollY * vw(-125) + vw(+120)}px) translateX(${vw(
      -21.2
    )}px) scale(${hoveredElements.px_pic04 ? 1 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const px_pic05 = useSpring({
    transform: `translateY(${scrollY * vw(-220) + vw(+190)}px) translateX(${vw(
      18.5
    )}px) scale(${hoveredElements.px_pic05 ? 1.1 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const px_pic06 = useSpring({
    transform: `translateY(${scrollY * vw(-270) + vw(+225)}px) translateX(${vw(
      39.7
    )}px) scale(${hoveredElements.px_pic06 ? 1.1 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const px_pic07 = useSpring({
    transform: `translateY(${scrollY * vw(-225) + vw(+240)}px) translateX(${-vw(
      26.042
    )}px) scale(${hoveredElements.px_pic07 ? 1.25 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const px_pic08 = useSpring({
    transform: `translateY(${scrollY * vw(-400) + vw(+355)}px) translateX(${vw(
      26.3
    )}px) scale(${hoveredElements.px_pic08 ? 1.1 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const px_pic09 = useSpring({
    transform: `translateY(${scrollY * vw(-500) + vw(+450)}px) translateX(${vw(
      -18
    )}px) scale(${hoveredElements.px_pic09 ? 1.1 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const px_pic10 = useSpring({
    transform: `translateY(${scrollY * vw(-545) + vw(+500)}px) translateX(${vw(
      24
    )}px) scale(${hoveredElements.px_pic10 ? 1.1 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const px_pic11 = useSpring({
    transform: `translateY(${scrollY * vw(-620) + vw(+590)}px) translateX(${vw(
      5
    )}px) scale(${hoveredElements.px_pic11 ? 1.1 : 1})`,
    config: ANIMATION_CONFIG,
  });

  // Текстовые блоки
  const textBlockFashion = useSpring({
    transform: `translateY(${scrollY * vw(-160) + vw(+75)}px) translateX(${vw(
      26
    )}px) scale(${hoveredElements.textBlock ? 1.05 : 1})`,

    config: ANIMATION_CONFIG,
  });

  const textBlockCommercial = useSpring({
    transform: `translateY(${scrollY * vw(-550) + vw(+510)}px) translateX(${vw(
      -35
    )}px) scale(${hoveredElements.textBlock ? 1.05 : 1})`,

    config: ANIMATION_CONFIG,
  });

  const textBlockEvents = useSpring({
    transform: `translateY(${scrollY * vw(-225) + vw(+180)}px) translateX(${vw(
      4
    )}px) scale(${hoveredElements.textBlock ? 1.05 : 1})`,

    config: ANIMATION_CONFIG,
  });

  const textBlockMagazine = useSpring({
    transform: `translateY(${scrollY * vw(-260) + vw(+243)}px) translateX(${vw(
      32
    )}px) scale(${hoveredElements.textBlock ? 1.05 : 1})`,

    config: ANIMATION_CONFIG,
  });

  const textBlockReportage = useSpring({
    transform: `translateY(${scrollY * vw(-300) + vw(+300)}px) translateX(${vw(
      -15
    )}px) scale(${hoveredElements.textBlock ? 1.05 : 1})`,

    config: ANIMATION_CONFIG,
  });

  const textBlockPersonal = useSpring({
    transform: `translateY(${scrollY * vw(-600) + vw(+555)}px) translateX(${vw(
      30
    )}px) scale(${hoveredElements.textBlock ? 1.05 : 1})`,

    config: ANIMATION_CONFIG,
  });

  const textBlockInterior = useSpring({
    transform: `translateY(${scrollY * vw(-650) + vw(+620)}px) translateX(${vw(
      20
    )}px) scale(${hoveredElements.textBlock ? 1.05 : 1})`,

    config: ANIMATION_CONFIG,
  });

  // Функция для обновления hover состояния
  const handleHover = (element, isHovered) => {
    setHoveredElements((prev) => ({
      ...prev,
      [element]: isHovered,
    }));
  };

  return (
    <div
      style={{
        height: "125vw",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <animated.img
        src="/images/parallax/pic_01.jpg"
        alt="Parallax layer 2"
        onMouseEnter={() => handleHover("px_pic01", true)}
        onMouseLeave={() => handleHover("px_pic01", false)}
        style={{
          ...px_pic01,
          position: "absolute",
          width: "50vw",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      <animated.img
        src="/images/parallax/pic_02.jpg"
        alt="Parallax layer 2"
        onMouseEnter={() => handleHover("px_pic02", true)}
        onMouseLeave={() => handleHover("px_pic02", false)}
        style={{
          ...px_pic02,
          position: "absolute",
          width: "13.021vw",
          objectFit: "cover",
          zIndex: 2,
          cursor: "pointer",
        }}
      />

      <animated.img
        src="/images/parallax/pic_03.jpg"
        alt="Parallax layer 3"
        onMouseEnter={() => handleHover("px_pic03", true)}
        onMouseLeave={() => handleHover("px_pic03", false)}
        style={{
          ...px_pic03,
          position: "absolute",
          width: "13.021vw",
          objectFit: "cover",
          zIndex: 3,
          cursor: "pointer",
        }}
      />

      <animated.img
        src="/images/parallax/pic_04.jpg"
        alt="Parallax layer 3"
        onMouseEnter={() => handleHover("px_pic04", true)}
        onMouseLeave={() => handleHover("px_pic04", false)}
        style={{
          ...px_pic04,
          position: "absolute",
          width: "50vw",
          objectFit: "cover",
          zIndex: 3,
          cursor: "pointer",
        }}
      />

      <animated.img
        src="/images/parallax/pic_05.jpg"
        alt="Parallax layer 3"
        onMouseEnter={() => handleHover("px_pic05", true)}
        onMouseLeave={() => handleHover("px_pic05", false)}
        style={{
          ...px_pic05,
          position: "absolute",
          width: "24vw",
          objectFit: "cover",
          zIndex: 3,
          cursor: "pointer",
        }}
      />

      <animated.img
        src="/images/parallax/pic_06.jpg"
        alt="Parallax layer 3"
        onMouseEnter={() => handleHover("px_pic06", true)}
        onMouseLeave={() => handleHover("px_pic06", false)}
        style={{
          ...px_pic06,
          position: "absolute",
          width: "13.021vw",
          objectFit: "cover",
          zIndex: 3,
          cursor: "pointer",
        }}
      />

      <animated.img
        src="/images/parallax/pic_07.jpg"
        alt="Parallax layer 3"
        onMouseEnter={() => handleHover("px_pic07", true)}
        onMouseLeave={() => handleHover("px_pic07", false)}
        style={{
          ...px_pic07,
          position: "absolute",
          width: "13.021vw",
          objectFit: "cover",
          zIndex: 3,
          cursor: "pointer",
        }}
      />

      <animated.img
        src="/images/parallax/pic_08.jpg"
        alt="Parallax layer 3"
        onMouseEnter={() => handleHover("px_pic08", true)}
        onMouseLeave={() => handleHover("px_pic08", false)}
        style={{
          ...px_pic08,
          position: "absolute",
          width: "40vw",
          objectFit: "cover",
          zIndex: 3,
          cursor: "pointer",
        }}
      />

      <animated.img
        src="/images/parallax/pic_09.jpg"
        alt="Parallax layer 3"
        onMouseEnter={() => handleHover("px_pic09", true)}
        onMouseLeave={() => handleHover("px_pic09", false)}
        style={{
          ...px_pic09,
          position: "absolute",
          width: "40vw",
          objectFit: "cover",
          zIndex: 3,
          cursor: "pointer",
        }}
      />

      <animated.img
        src="/images/parallax/pic_10.jpg"
        alt="Parallax layer 3"
        onMouseEnter={() => handleHover("px_pic10", true)}
        onMouseLeave={() => handleHover("px_pic10", false)}
        style={{
          ...px_pic10,
          position: "absolute",
          width: "13.021vw",
          objectFit: "cover",
          zIndex: 3,
          cursor: "pointer",
        }}
      />

      <animated.img
        src="/images/parallax/pic_11.jpg"
        alt="Parallax layer 3"
        onMouseEnter={() => handleHover("px_pic11", true)}
        onMouseLeave={() => handleHover("px_pic11", false)}
        style={{
          ...px_pic11,
          position: "absolute",
          width: "26vw",
          objectFit: "cover",
          zIndex: 3,
          cursor: "pointer",
        }}
      />

      {/* Текстовые блоки */}
      <animated.div
        onMouseEnter={() => handleHover("textBlock", true)}
        onMouseLeave={() => handleHover("textBlock", false)}
        style={{
          ...textBlockFashion,
          ...STYLES.textBlock,
        }}
      >
        <h3 style={STYLES.heading}>fashion</h3>
      </animated.div>

      <animated.div
        onMouseEnter={() => handleHover("textBlock", true)}
        onMouseLeave={() => handleHover("textBlock", false)}
        style={{
          ...textBlockCommercial,
          ...STYLES.textBlock,
        }}
      >
        <h3 style={STYLES.heading}>e-commerce</h3>
      </animated.div>

      <animated.div
        onMouseEnter={() => handleHover("textBlock", true)}
        onMouseLeave={() => handleHover("textBlock", false)}
        style={{
          ...textBlockEvents,
          ...STYLES.textBlock,
        }}
      >
        <h3 style={STYLES.heading}>events</h3>
      </animated.div>

      <animated.div
        onMouseEnter={() => handleHover("textBlock", true)}
        onMouseLeave={() => handleHover("textBlock", false)}
        style={{
          ...textBlockMagazine,
          ...STYLES.textBlock,
        }}
      >
        <h3 style={STYLES.heading}>magazine</h3>
      </animated.div>

      <animated.div
        onMouseEnter={() => handleHover("textBlock", true)}
        onMouseLeave={() => handleHover("textBlock", false)}
        style={{
          ...textBlockReportage,
          ...STYLES.textBlock,
        }}
      >
        <h3 style={STYLES.heading}>reportage</h3>
      </animated.div>

      <animated.div
        onMouseEnter={() => handleHover("textBlock", true)}
        onMouseLeave={() => handleHover("textBlock", false)}
        style={{
          ...textBlockPersonal,
          ...STYLES.textBlock,
        }}
      >
        <h3 style={STYLES.heading}>personal</h3>
      </animated.div>

      <animated.div
        onMouseEnter={() => handleHover("textBlock", true)}
        onMouseLeave={() => handleHover("textBlock", false)}
        style={{
          ...textBlockInterior,
          ...STYLES.textBlock,
        }}
      >
        <h3 style={STYLES.heading}>interior</h3>
      </animated.div>

      <div className="parallax-fade"></div>
    </div>
  );
};

export default ParallaxSection;
