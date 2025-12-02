export const marqueeFooter = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const marqueeContainer = document.querySelector(".marqueeFooter");
    const marqueeWrap = document.querySelector(".marqueeFooterWrap");

    if (!marqueeContainer || !marqueeWrap) {
      return;
    }

    console.log("Marquee footer initialized");

    // ЕДИНЫЙ КОНТРОЛЬ СКОРОСТИ
    const MARQUEE_SPEED = 8000; // Изменяйте только это число для контроля скорости (в миллисекундах)

    // Настройки - рассчитываем как в карусели
    const textWidth = 3.555; // vw - примерный размер одного символа
    const gapWidth = 2.734; // vw
    const textCount = 4; // количество повторений текста
    const oneSetWidth = 70; // Примерная ширина одного комплекта текста в vw

    let currentAnimation = null;
    let currentDuration = MARQUEE_SPEED;
    let targetDuration = MARQUEE_SPEED;
    let speedTransitionAnimation = null;

    // Функция для создания анимации - точно как в карусели
    const createAnimation = (duration = MARQUEE_SPEED) => {
      // Останавливаем предыдущую анимацию если есть
      if (currentAnimation) {
        currentAnimation.cancel();
      }

      // Создаем новую анимацию
      currentAnimation = marqueeWrap.animate(
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

    // Функция плавного изменения скорости с интерполяцией - точно как в карусели
    const smoothChangeSpeed = (newTargetDuration) => {
      targetDuration = newTargetDuration;

      // Останавливаем предыдущий переход если есть
      if (speedTransitionAnimation) {
        speedTransitionAnimation.cancel();
      }

      const startDuration = currentDuration;
      const durationDifference = targetDuration - startDuration;
      const transitionTime = 100; // 100ms на переход

      // Создаем анимацию для плавного изменения скорости
      speedTransitionAnimation = marqueeWrap.animate(
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

        // Обновляем анимацию marquee с новой скоростью
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
    createAnimation(MARQUEE_SPEED);

    // Обработка изменения размера окна
    window.addEventListener("resize", () => {
      smoothChangeSpeed(MARQUEE_SPEED);
    });

    // Очистка при выходе
    window.addEventListener("beforeunload", () => {
      if (currentAnimation) {
        currentAnimation.cancel();
      }
      if (speedTransitionAnimation) {
        speedTransitionAnimation.cancel();
      }
    });
  });
};
