export const reviewsCarousel = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const reviewsContainer = document.querySelector(".reviewsCarousel");

    if (!reviewsContainer) {
      console.error("Reviews carousel elements not found");
      return;
    }

    console.log("Reviews carousel initialized");

    // ЕДИНЫЙ КОНТРОЛЬ СКОРОСТИ
    const REVIEWS_SPEED = 20000; // Изменяйте только это число для контроля скорости (в миллисекундах)

    // Настройки - рассчитываем как в карусели
    const cardWidth = 35.938; // vw - ширина одной карточки
    const gapWidth = 3.125; // vw - gap между карточками
    const cardCount = 4; // количество уникальных карточек (половина от общего количества)
    const oneSetWidth = cardWidth * cardCount + gapWidth * cardCount;

    let currentAnimation = null;
    let isHovered = false;
    let currentDuration = REVIEWS_SPEED;
    let targetDuration = REVIEWS_SPEED;
    let speedTransitionAnimation = null;

    // Функция для создания анимации - точно как в карусели
    const createAnimation = (duration = REVIEWS_SPEED) => {
      // Останавливаем предыдущую анимацию если есть
      if (currentAnimation) {
        currentAnimation.cancel();
      }

      // Создаем новую анимацию
      currentAnimation = reviewsContainer.animate(
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
      speedTransitionAnimation = reviewsContainer.animate(
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

        // Обновляем анимацию reviews с новой скоростью
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
    createAnimation(REVIEWS_SPEED);

    // Обработчики hover с плавными переходами
    reviewsContainer.addEventListener("mouseenter", () => {
      if (!isHovered) {
        isHovered = true;
        smoothChangeSpeed(REVIEWS_SPEED * 3); // Плавно замедляем в 3 раза
        console.log(
          "Reviews carousel: Smoothly slowing down to",
          REVIEWS_SPEED * 3 + "ms"
        );
      }
    });

    reviewsContainer.addEventListener("mouseleave", () => {
      if (isHovered) {
        isHovered = false;
        smoothChangeSpeed(REVIEWS_SPEED); // Плавно возвращаем обычную скорость
        console.log(
          "Reviews carousel: Smoothly speeding up to",
          REVIEWS_SPEED + "ms"
        );
      }
    });

    // Обработка изменения размера окна
    window.addEventListener("resize", () => {
      const targetDur = isHovered ? REVIEWS_SPEED * 3 : REVIEWS_SPEED;
      smoothChangeSpeed(targetDur);
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
