export const carousel = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const carouselLine = document.querySelector(".carouselLine");

    if (!carousel || !carouselLine) {
      return;
    }

    console.log("Web Animations API carousel initialized");

    // Настройки
    let imageWidth; // vw
    let gapWidth; // vw
    const imageCount = 5;
    const totalGaps = 4.5;
    let oneSetWidth;

    const recalcLayout = () => {
      if (window.innerWidth < 768) {
        imageWidth = 63.104; // vw for <768px
        gapWidth = 3.053; // vw for <768px
      } else {
        imageWidth = 26.563; // vw default
        gapWidth = 0.781; // vw default
      }
      oneSetWidth = imageWidth * imageCount + gapWidth * totalGaps;
    };
    recalcLayout();

    let currentAnimation = null;
    let isHovered = false;
    let currentDuration = 15000;
    let targetDuration = 15000;
    let speedTransitionAnimation = null;

    // Функция для создания анимации
    const createAnimation = (duration = 15000) => {
      // Останавливаем предыдущую анимацию если есть
      if (currentAnimation) {
        currentAnimation.cancel();
      }

      // Создаем новую анимацию
      currentAnimation = carouselLine.animate(
        [
          { transform: `translateX(0vw)` },
          { transform: `translateX(-${oneSetWidth}vw)` },
        ],
        {
          duration: duration,
          iterations: Infinity,
          easing: "linear",
        }
      );

      return currentAnimation;
    };

    // Функция плавного изменения скорости с интерполяцией
    const smoothChangeSpeed = (newTargetDuration) => {
      targetDuration = newTargetDuration;

      // Останавливаем предыдущий переход если есть
      if (speedTransitionAnimation) {
        speedTransitionAnimation.cancel();
      }

      const startDuration = currentDuration;
      const durationDifference = targetDuration - startDuration;
      const transitionTime = 100; // 1.5 секунды на переход

      // Создаем анимацию для плавного изменения скорости
      speedTransitionAnimation = carouselLine.animate(
        [
          { opacity: 1 }, // Dummy keyframes для времени
          { opacity: 1 },
        ],
        {
          duration: transitionTime,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)", // Плавный easing
        }
      );

      // Обновляем скорость анимации в каждом кадре
      const updateSpeed = () => {
        if (!speedTransitionAnimation) return;

        const progress = speedTransitionAnimation.currentTime / transitionTime;

        if (progress >= 1) {
          // Переход завершен
          currentDuration = targetDuration;
          speedTransitionAnimation = null;
          return;
        }

        // Интерполируем duration с easing
        const easedProgress = easeOutCubic(progress);
        currentDuration = startDuration + durationDifference * easedProgress;

        // Обновляем анимацию карусели с новой скоростью
        if (currentAnimation) {
          const currentTime = currentAnimation.currentTime;
          const oldDuration =
            currentAnimation.effect.getComputedTiming().duration;
          const currentProgress = currentTime / oldDuration;

          createAnimation(currentDuration);
          currentAnimation.currentTime = currentProgress * currentDuration;
        }

        requestAnimationFrame(updateSpeed);
      };

      requestAnimationFrame(updateSpeed);
    };

    // Easing функция для плавности
    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3);
    };

    // Запускаем анимацию
    createAnimation(15000); // 15 секунд

    // Обработчики hover с плавными переходами
    carousel.addEventListener("mouseenter", () => {
      if (!isHovered) {
        isHovered = true;
        smoothChangeSpeed(30000); // Плавно замедляем в 2 раза
        console.log("Smoothly slowing down to 30s");
      }
    });

    carousel.addEventListener("mouseleave", () => {
      if (isHovered) {
        isHovered = false;
        smoothChangeSpeed(15000); // Плавно возвращаем обычную скорость
        console.log("Smoothly speeding up to 15s");
      }
    });

    // Обработка изменения размера окна
    window.addEventListener("resize", () => {
      const targetDur = isHovered ? 30000 : 15000;
      // Пересчитываем размеры для адаптива
      recalcLayout();

      // Перестраиваем анимацию с сохранением прогресса
      if (currentAnimation) {
        const currentTime = currentAnimation.currentTime || 0;
        const oldDuration =
          currentAnimation.effect.getComputedTiming().duration;
        const currentProgress = oldDuration ? currentTime / oldDuration : 0;
        createAnimation(currentDuration);
        currentAnimation.currentTime = currentProgress * currentDuration;
      } else {
        createAnimation(currentDuration);
      }

      smoothChangeSpeed(targetDur);
    });

    // Очистка при выходе
    window.addEventListener("beforeunload", () => {
      if (currentAnimation) {
        currentAnimation.cancel();
      }
    });
  });
};
