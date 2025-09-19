import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const ParallaxSection = () => {
  const [scrollY, setScrollY] = useState(0);

  // 🎛️ Единые настройки анимации - регулируйте здесь!
  const ANIMATION_CONFIG = {
    tension: 300,
    friction: 30,
  };

  // Hover состояния для каждого изображения
  const [hoveredElements, setHoveredElements] = useState({
    bg: false,
    left: false,
    right: false,
    connor: false,
    newL: false,
    newR: false,
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

  const bg = useSpring({
    transform: `translateY(${scrollY * vw(-40) + vw(10)}px) scale(${
      hoveredElements.bg ? 1 : 1
    })`,
    config: ANIMATION_CONFIG,
  });

  // Объединяем scroll и hover анимации
  const leftImageSpring = useSpring({
    transform: `translateY(${scrollY * vw(-200) + vw(+90)}px) translateX(${-vw(
      26.042
    )}px) scale(${hoveredElements.left ? 1.15 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const rightImageSpring = useSpring({
    transform: `translateY(${scrollY * vw(-380) + vw(+195)}px) translateX(${vw(
      26.042
    )}px) scale(${hoveredElements.right ? 1.2 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const connor = useSpring({
    transform: `translateY(${scrollY * vw(-125) + vw(+120)}px) translateX(${vw(
      -18
    )}px) scale(${hoveredElements.connor ? 1 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const newL = useSpring({
    transform: `translateY(${scrollY * vw(-225) + vw(+240)}px) translateX(${-vw(
      26.042
    )}px) scale(${hoveredElements.newL ? 1.25 : 1})`,
    config: ANIMATION_CONFIG,
  });

  const newR = useSpring({
    transform: `translateY(${scrollY * vw(-175) + vw(+160)}px) translateX(${vw(
      24
    )}px) scale(${hoveredElements.newR ? 1.1 : 1})`,
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
        src="/images/3D/img1.jpg"
        alt="Parallax layer 2"
        onMouseEnter={() => handleHover("bg", true)}
        onMouseLeave={() => handleHover("bg", false)}
        style={{
          ...bg,
          position: "absolute",
          width: "50vw",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      <animated.img
        src="/images/3D/img8.jpg"
        alt="Parallax layer 2"
        onMouseEnter={() => handleHover("left", true)}
        onMouseLeave={() => handleHover("left", false)}
        style={{
          ...leftImageSpring,
          position: "absolute",
          width: "9.766vw",
          objectFit: "cover",
          zIndex: 2,
          cursor: "pointer",
        }}
      />

      <animated.img
        src="/images/3D/img4.jpg"
        alt="Parallax layer 3"
        onMouseEnter={() => handleHover("right", true)}
        onMouseLeave={() => handleHover("right", false)}
        style={{
          ...rightImageSpring,
          position: "absolute",
          width: "13.021vw",
          objectFit: "cover",
          zIndex: 3,
          cursor: "pointer",
        }}
      />

      <animated.img
        src="/images/3D/img9.jpg"
        alt="Parallax layer 3"
        onMouseEnter={() => handleHover("connor", true)}
        onMouseLeave={() => handleHover("connor", false)}
        style={{
          ...connor,
          position: "absolute",
          width: "50vw",
          objectFit: "cover",
          zIndex: 3,
          cursor: "pointer",
        }}
      />

      <animated.img
        src="/images/3D/img10.jpg"
        alt="Parallax layer 3"
        onMouseEnter={() => handleHover("newL", true)}
        onMouseLeave={() => handleHover("newL", false)}
        style={{
          ...newL,
          position: "absolute",
          width: "13.021vw",
          objectFit: "cover",
          zIndex: 3,
          cursor: "pointer",
        }}
      />

      <animated.img
        src="/images/3D/img11.jpg"
        alt="Parallax layer 3"
        onMouseEnter={() => handleHover("newR", true)}
        onMouseLeave={() => handleHover("newR", false)}
        style={{
          ...newR,
          position: "absolute",
          width: "26vw",
          objectFit: "cover",
          zIndex: 3,
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default ParallaxSection;
